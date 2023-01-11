class ProductModel extends HTMLElement {
	constructor(){
		super();
		this.openModalModel();
		this.addEventListener('click', this.loadContent());
	}

	loadContent(){
		Shopify.loadFeatures([
			{
				name: 'model-viewer-ui',
				version: '1.0',
				onLoad: this.setupModalViewerUI.bind(this)
			}
		])
	}

	setupModalViewerUI(errors){
		if(errors) return;
		this.modelViewerUI = new Shopify.modelViewerUI(document.querySelector('model-viewer'));
	}

	getMediaId(){
		const id = this.getAttribute('data-media-id');
		return id;
	}

	getModal(){
		const modal = document.getElementById("productModelModal");
		return modal;
	}

	openModalModel() {
		const mediaID = this.getMediaId();
		const modal = this.getModal();

		if(!mediaID) return;

		const openModalButton = this.querySelector(`button[id="productModalOpenButton_${mediaID}"]`);

		openModalButton.addEventListener('click', function(e) {
			modal.querySelector("#body").innerHTML = "";

			const template = document.querySelector(`product-model[data-media-id="${mediaID}"] > template`);
			const clone = template.content.cloneNode(true);
			modal.querySelector('#body').appendChild(clone);
			modal.querySelector("#body > model-viewer").setAttribute("reveal", "auto");
		});
	}

	
}


const productModel = customElements.define('product-model', ProductModel)