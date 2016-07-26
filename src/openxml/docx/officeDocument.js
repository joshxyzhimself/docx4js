import {PassThrough} from "stream"
import sax from "sax"
import Part from "../part"
import Styles from "./styles"

import FontTheme from "./theme/font"
import ColorTheme from "./theme/color"
import FormatTheme from "./theme/format"


const builtIn='webSettings,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',')
export default class extends Part{
	_parse1(type){
		return Promise.all(Object.keys(this.rels).map(id=>{
			let rel=this.rels[id]
			if(rel.type==type){
				return this.doc.getObjectPart(rel.target)
					.then(parsed=>this[type]=parsed)
			}
		}))
	}
	_parseNonContent(){
		let doc=this.doc
		let transPr={
			validator(xpath,currentValue, newValue){
				return doc.onToProperty(newValue, xpath.split('/').pop())
			}
		}

		return this._parse1("settings").then(a=>this._parse1("theme",transPr)).then(a=>{
			this.fontTheme=new FontTheme(this.theme.get('theme.themeElements.fontScheme'),this.settings.get('settings.themeFontLang',false)[0].$)
			this.colorTheme=new ColorTheme(this.theme.get('theme.themeElements.clrScheme'),this.settings.get('settings.clrSchemeMapping').$)
			this.formatTheme=new FormatTheme(this.theme.get('theme.themeElements.fmtScheme'))
		}).then(a=>{
			return Promise.all(Object.keys(this.rels).map(id=>{
				let rel=this.rels[id]
				if(builtIn.indexOf(rel.type)!=-1){
					return this.doc.getObjectPart(rel.target, (rel.type=='styles' || rel.type=='numbering') ? transPr : null)
						.then(parsed=>this[rel.type]=parsed)
				}
			}).filter(a=>a)).then(a=>{
				this.styles=new Styles(this.styles, this.doc)
			})
		})
	}
	parse(){
		let args=arguments
		function asXmlObject(node){
			let $=node.$=node.attributes
			delete node.attributes
			delete node.parent
			delete node.name
			Object.keys($).forEach(a=>{
				let as=a.split(':')
				if(as.length==2){
					$[as[1]]=$[a]
					delete $[a]
				}
			})
			return node
		}
		return this._parseNonContent().then(a=>{
			return new Promise(resolve=>{
				let root={
					name:this.doc.constructor.ext,
					children:[]
				}
				let body=null, sect=null, pr=null, current=root
				let sections=[]

				let stream=new PassThrough()
				stream.end(new Buffer(this.data.asUint8Array()))
				stream.pipe(sax.createStream(true,{xmlns:false}))
				.on("opentag", node=>{
					if(this.doc.isProperty(node.name) && pr==null){
						pr=node
					}

					node.parent=current
					current=node

					if(pr==null){
						node.children=[]
						node.parent.children.push(node)
					}
					switch(node.name){
					case 'w:body':
						body=current
					break
					case 'w:sectPr':
						sect=current
					break
					}
				})
				.on("closetag",tag=>{
					const {attributes, parent, children, local,name}=current
					if(pr==null){
						let index=parent.children.indexOf(current)
						attributes.key=index
						if(tag=='w:document'){
							current.children=sections
							builtIn.forEach(a=>attributes[a]=this[a])
							attributes.directStyle=this.styles.getDefault("document")
						}
						let element=this.doc.createElement(current,...args)

						parent.children.splice(index,1,element)
						current=parent
					}else if(current==pr){
						let type=tag.split(':').pop()
						let property=this.doc.toProperty(asXmlObject(current),type)
						current=parent
						if(pr!=sect){
							current.attributes.directStyle=property
						}else
							sect=property

						pr=null
					}else{
						let type=tag.split(':').pop()
						parent[type]=this.doc.onToProperty(asXmlObject(current),type)
						current=parent
					}

					if(current==body && sect!=null){
						sections.push(this.doc.createElement({name:'section', attributes: sect, children: body.children.splice(0)},...args))
						sect=null
					}

				})
				.on("end", a=>{
					resolve(root.children[0])
				})
				.on("text", text=>{
					if(current.name=="w:t")
						current.children=text
				})
			})
		})
	}
}