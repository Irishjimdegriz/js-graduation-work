function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < def.length ? def.charAt(i++) : (i < val.length ? val.charAt(i++) || def.charAt(i) : a);
			});
		i = newValue.indexOf("_");
		if (i != -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type == "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (let elem = 0; elem < elems.length; elem++) {
		elems[elem].addEventListener("input", mask);
		elems[elem].addEventListener("focus", mask);
		elems[elem].addEventListener("blur", mask);
	}
	
}

const phoneMask = () => {
    maskPhone('[name="phone"]');
}

export default phoneMask;