"use strict";
/*
 * Model for Footer entity
 */
var keystone = require("keystone");
var Types = keystone.Field.Types;

// initialise the model
var Region = new keystone.List("Region", {
    map: { name: "nombre" },
    defaultColumns: "titulo",
    label: "Region"
});

// add fields
Region.add({
    nombre: {
        type: Types.Text,
        label: "Nombre"
    },
    descripcion: {
        type: Types.Html,
        wysiwyg: true,
        label: "Descripcion"
    }
});

Region.relationship({ ref: 'Prop', path: 'region' });


// register the model with keystone
Region.register();

/* this module does not export anything */