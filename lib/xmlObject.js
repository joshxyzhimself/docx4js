'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XmlObject = function () {
	function XmlObject(objectFromXml2Js) {
		_classCallCheck(this, XmlObject);

		this.raw = objectFromXml2Js;
	}

	_createClass(XmlObject, [{
		key: 'get',
		value: function get(path) {
			return XmlObject.get(path, this.raw);
		}
	}], [{
		key: 'get',
		value: function get(path, xmlobj) {
			var value = path.split(".").reduce(function (p, key) {
				if (!p) return p;

				if (Array.isArray(p) && p.length == 1) p = p[0];

				p = p[key];

				return p;
			}, xmlobj);

			return value;
		}
	}, {
		key: 'getable',
		value: function getable(xmlobj) {
			(typeof xmlobj === 'undefined' ? 'undefined' : _typeof(xmlobj)) == 'object' && (xmlobj.get = function (path) {
				var trim = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

				var value = XmlObject.get(path, xmlobj);

				if (trim) {
					if (Array.isArray(value) && value.length == 1) value = value[0];

					if (value && value.$ && value.$.val != undefined) value = value.$.val;
				}

				if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') return XmlObject.getable(value);
				return value;
			});

			return xmlobj;
		}
	}]);

	return XmlObject;
}();

exports.default = XmlObject;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy94bWxPYmplY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQXFCO0FBQ3BCLFVBRG9CLFNBQ3BCLENBQVksZ0JBQVosRUFBNkI7d0JBRFQsV0FDUzs7QUFDNUIsT0FBSyxHQUFMLEdBQVMsZ0JBQVQsQ0FENEI7RUFBN0I7O2NBRG9COztzQkFLaEIsTUFBSztBQUNSLFVBQU8sVUFBVSxHQUFWLENBQWMsSUFBZCxFQUFtQixLQUFLLEdBQUwsQ0FBMUIsQ0FEUTs7OztzQkFJRSxNQUFNLFFBQU87QUFDdkIsT0FBSSxRQUFNLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsTUFBaEIsQ0FBdUIsVUFBQyxDQUFELEVBQUcsR0FBSCxFQUFTO0FBQ3pDLFFBQUcsQ0FBQyxDQUFELEVBQ0YsT0FBTyxDQUFQLENBREQ7O0FBR0EsUUFBRyxNQUFNLE9BQU4sQ0FBYyxDQUFkLEtBQW9CLEVBQUUsTUFBRixJQUFVLENBQVYsRUFDdEIsSUFBRSxFQUFFLENBQUYsQ0FBRixDQUREOztBQUdBLFFBQUUsRUFBRSxHQUFGLENBQUYsQ0FQeUM7O0FBU3pDLFdBQU8sQ0FBUCxDQVR5QztJQUFULEVBVS9CLE1BVlEsQ0FBTixDQURtQjs7QUFhdkIsVUFBTyxLQUFQLENBYnVCOzs7OzBCQWdCVCxRQUFPO0FBQ3JCLFdBQU8sdURBQVAsSUFBZ0IsUUFBaEIsS0FBNkIsT0FBTyxHQUFQLEdBQVcsVUFBUyxJQUFULEVBQXdCO1FBQVYsNkRBQUssb0JBQUs7O0FBQy9ELFFBQUksUUFBTSxVQUFVLEdBQVYsQ0FBYyxJQUFkLEVBQW1CLE1BQW5CLENBQU4sQ0FEMkQ7O0FBRy9ELFFBQUcsSUFBSCxFQUFRO0FBQ1AsU0FBRyxNQUFNLE9BQU4sQ0FBYyxLQUFkLEtBQXdCLE1BQU0sTUFBTixJQUFjLENBQWQsRUFDMUIsUUFBTSxNQUFNLENBQU4sQ0FBTixDQUREOztBQUdBLFNBQUcsU0FBUyxNQUFNLENBQU4sSUFBVyxNQUFNLENBQU4sQ0FBUSxHQUFSLElBQWEsU0FBYixFQUN0QixRQUFNLE1BQU0sQ0FBTixDQUFRLEdBQVIsQ0FEUDtLQUpEOztBQVFBLFFBQUcsU0FBUyxRQUFPLHFEQUFQLElBQWUsUUFBZixFQUNYLE9BQU8sVUFBVSxPQUFWLENBQWtCLEtBQWxCLENBQVAsQ0FERDtBQUVBLFdBQU8sS0FBUCxDQWIrRDtJQUF4QixDQUF4QyxDQURxQjs7QUFpQnJCLFVBQU8sTUFBUCxDQWpCcUI7Ozs7UUF6QkYiLCJmaWxlIjoieG1sT2JqZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWG1sT2JqZWN0e1xyXG5cdGNvbnN0cnVjdG9yKG9iamVjdEZyb21YbWwySnMpe1xyXG5cdFx0dGhpcy5yYXc9b2JqZWN0RnJvbVhtbDJKc1xyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgpe1xyXG5cdFx0cmV0dXJuIFhtbE9iamVjdC5nZXQocGF0aCx0aGlzLnJhdylcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQocGF0aCwgeG1sb2JqKXtcclxuXHRcdGxldCB2YWx1ZT1wYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKHAsa2V5KT0+e1xyXG5cdFx0XHRpZighcClcclxuXHRcdFx0XHRyZXR1cm4gcFxyXG5cclxuXHRcdFx0aWYoQXJyYXkuaXNBcnJheShwKSAmJiBwLmxlbmd0aD09MSlcclxuXHRcdFx0XHRwPXBbMF1cclxuXHJcblx0XHRcdHA9cFtrZXldXHJcblxyXG5cdFx0XHRyZXR1cm4gcFxyXG5cdFx0fSx4bWxvYmopXHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0YWJsZSh4bWxvYmope1xyXG5cdFx0dHlwZW9mKHhtbG9iaik9PSdvYmplY3QnICYmICh4bWxvYmouZ2V0PWZ1bmN0aW9uKHBhdGgsdHJpbT10cnVlKXtcclxuXHRcdFx0bGV0IHZhbHVlPVhtbE9iamVjdC5nZXQocGF0aCx4bWxvYmopXHJcblxyXG5cdFx0XHRpZih0cmltKXtcclxuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGg9PTEpXHJcblx0XHRcdFx0XHR2YWx1ZT12YWx1ZVswXVxyXG5cclxuXHRcdFx0XHRpZih2YWx1ZSAmJiB2YWx1ZS4kICYmIHZhbHVlLiQudmFsIT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHR2YWx1ZT12YWx1ZS4kLnZhbFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpPT0nb2JqZWN0JylcclxuXHRcdFx0XHRyZXR1cm4gWG1sT2JqZWN0LmdldGFibGUodmFsdWUpXHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4geG1sb2JqXHJcblx0fVxyXG59XHJcbiJdfQ==