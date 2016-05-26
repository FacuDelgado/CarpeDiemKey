var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Prop = new keystone.List('Prop', {
	map: { name: 'titulo' },
	autokey: { path: 'slug', from: 'titulo', unique: true }
});

Prop.add({
	titulo: { type: Types.Text, required: true, label: "Titulo", index: true  },
	descripcion: { type: Types.Html, label: "Descripcion", index: true  },
	region: { type: Types.Relationship, ref: 'Region', label: "Zona de ubicacion"},
	tipo: { type: Types.Select, options: 'Casa, Departamento, Duplex, PH, Casa quinta, Local comercial', default: 'Casa', label: "Tipo de vivienda", index: true },
	fechaPublicacion: { type: Types.Date, index: true, label: "Fecha de publicacion" },
	imagenes: { type: Types.CloudinaryImages, folder: 'path/to/image', label: "Imagenes de la propiedad" },
	ambientes: { type: Types.Number, label: "Cantidad de ambientes"},
	superficie: { type: Types.Number, label: "Superficie en m²"},
	baños: { type: Types.Number, label: "Cantidad de baños"},
	latitud: { type: Types.Text, label: "Latitud para GoogleMaps"},
	longitud: { type: Types.Text, label: "Longitud para GoogleMaps"}
});

Prop.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});


Prop.addPattern('standard meta');
Prop.defaultColumns = 'titulo, tipo|20%, fechaPublicacion|20%, region|20%';
Prop.register();
