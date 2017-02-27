$(function(){


var listar = { operacion : "publicaciones" , entidad : $(padre).find("#ent option:selected").val() }

$("#grid_clasificados").kendoGrid({
	dataSource: {   
		transport: {
			read: {
				url: "clasificado_functions.php",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				type: "GET",
                data : listar,
                complete:function(){
			    	$(padre).find(".valida_carga").css("display","none");
			    }
			}
		},
	pageSize: 20
	},
	height: 250,
	sortable: true,
	pageable: {
			refresh: true,
			pageSizes: true,
			buttonCount: 5,
			messages:{
				display:"{0} - {1} de {2} registros",
				itemsPerPage: "registros por pagina",
				empty: "No hay registros"
			}
		},
	columns:[
				{ field: "clas_da_fec", title: "Fecha",width: 120 },
				{ field: "clas_vc12_tel" , title: "# Contacto",width: 90},
				{ field: "clas_vc90_tit", title: "Titulo" , width: 130}, 
				{ field: "clas_te_des", title: "Descripcion" , hidden : true },
				{ field: "grupo", title: "Grupo" , width: 90},
				{ field: "categoria", title: "Categoria"},
				{ field: "sub_categoria",title: "Sub Categoria"},
				{ field: "clas_vc20_img", title: "Imagen" ,width: 115 ,  template : '#= imagen_clasificado(clas_vc20_img)#' },
                { field:"",title:"",width:110, 
                             command: [
				                       { template: obtener_html('completo') }
								]}	
	        ],
	groupable: {
		    messages: {
		        empty: "Arrastre las cabeceras para agrupar los datos"
		    }
		},
	dataBound: function(){
			var dataSource = this.dataSource,
			allData = dataSource.data(),
			filters = dataSource.filter(),
			query = new kendo.data.Query(allData),
			filteredData = query.filter(filters).data;
			if(allData.length==0){
					rowempty('grid_clasificados',7,'No se encontraron resultados');
					return false;
			}
			if(filteredData.length==0 ){
					rowempty('grid_clasificados',7,'No se encontraron resultados');
					return false;
			}
	},
    editable: "popup",
	});

 });


function ver_completo(e){

var tr = $(e).closest('tr'),
		gridPortero=$("#grid_clasificados").data("kendoGrid"),
		data = gridPortero.dataItem(tr),
		anuncio_completo = $("#windows").kendoWindow({
							title : "Ficha Anuncio Clasificado",
							visible : false,
							actions : [
							"close"
							],
							modal : true,
							width : "812px",
							height : "376px",
							open:function(){
								setTimeout(function(){
									$("#windows").closest(".k-window").css({ top: "2px" });
								},300);	

							}
		}).data("kendoWindow"),
		ficha_anuncio=obtener_html('anuncio_completo');
		anuncio_completo.content(ficha_anuncio(data));
		anuncio_completo.open().center();
}

function checkNull(item){
	 return item == '' ? "nodisponible.jpg" : item;
}

function imagen_clasificado(image){
	image = (image=='') ? "nodisponible.png" : image;
	return '<img src="../Images/clasificados/thumbs/'+image+'" width="110" height="72">';
}