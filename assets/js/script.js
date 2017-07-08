$(document).ready(function($) {
	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon/',
		type: 'GET',
		dataType: 'JSON',
		data: {'limit': '12'}
	})
	.done(function(pokemones) {
		console.log("success");
		console.log(pokemones);
		mostrarPkmn(pokemones);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	function mostrarPkmn(e) {
		e.results.forEach(function(elemento) {
			var nombre = elemento.name;
			var pkmnURL = elemento.url;

			var card = $('<div>').addClass('card col');
			var cardCont = $('<div>').addClass('card-content');
			var pkmnName = $('<span>').addClass('card-title').text(nombre);
			//console.log(elemento);

			// AJAX para el ID del Pokémon
			$.ajax({
				url: pkmnURL,
				type: 'GET',
				dataType: 'JSON'
			})
			.done(function(pokemon) {
				console.log("success");
				console.log(pokemon);
				cardId(pokemon);
				$('#pokedex').append(card);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

			// función para agregar sprite
			function cardId(e) {
				var pkmnID = e.id;
				
				// contenedor Imagen y fab
				var cardImg = $('<div>').addClass('card-image');

				var pkmnIdStr = '#modal-'+ pkmnID;

				// Fab Button
				var fabBtn = $('<a>').attr({'href': pkmnIdStr});
				fabBtn.addClass('btn-floating halfway-fab waves-effect waves-light modal-trigger red');
				fabBtn.html('<i class="material-icons">add</>'); // icono " + "
				//modal
				fabBtn.click(function() {
					var modal = $('<div>').addClass('modal open');
					modal.attr({'id':'modal-'+ pkmnID});
					var modalContent = $('<div>').addClass('modal-content');
					var modalH4 = $('<h4>').text(nombre);
					modalContent.append(modalH4);
					//var pkmnFlavor = e.flavor_text_entries[1].flavor_text;
					var modalP = $('<p>').text('descripción de pokémon');
					modalContent.append(modalP);
					var modalFooter = $('<div>').addClass('modal-footer');
					var modalClose = $('<a>').attr({'href':'#!'});
					modalClose.addClass('amber lighten-1 white-text modal-action modal-close waves-effect waves-green btn-flat');
					modalClose.text('Close');
					modalClose.click(function(e) {
						e.preventDefault();
						$(this).parent(".modal-footer").parent(".modal").removeClass('open');
					});
					modalFooter.append(modalClose);
					modal.append(modalFooter);
					modal.append(modalContent);
					card.append(modal);
				});

				cardImg.append(fabBtn);

				// crear imagen
				var sprite = $('<img>').attr({
					'src':'http://pokeapi.co/media/img/'+ pkmnID +'.png',
					'alt': nombre
				});
				sprite.appendTo(cardImg);

				// crear card de cada pokemón
				cardCont.append(pkmnName);
				card.append(cardImg);
				card.append(cardCont);
			}
		});
	}
});