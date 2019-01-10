var app = new Vue({
    el: '#app',
    data: {
        info: {},
        info2: {},
        calendario: [],
        calendario2: [],
        Torneos: [],
        Torneos2: [],
        TorneoExterior: [],
        TorneoExterior2: [],
        datosTorneo: {},
        //        mapa {},


    },
    created: function () {
        this.getData();
        this.PrintName();
        this.OcultarDiv();
    },
    methods: {

        getData: function () {
            fetch("https://api.myjson.com/bins/1408vs", {
                method: "GET",
            }).then(function (response) {
                if (response.ok) {

                    return response.json();
                }

            }).then(function (json) {

                app.info = json.About.Nosotros;
                app.info2 = json.About.Formacion;
                app.calendario = json.CalendarioClase.Dias
                app.calendario2 = json.CalendarioClase.Horas.toString();
                app.Torneos = json.CalendarioTorneoClase.Horas
                app.Torneos2 = json.CalendarioTorneoClase.Juegos
                app.TorneoExterior = json.CalendarioTorneosExternos.Eventos
                app.PrintName();
                app.mapa = json.CalendarioTorneosExternos.Eventos


            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });


        },
        PrintName: function () {
            for (var i = 0; i < this.TorneoExterior.length; i++) {
                this.TorneoExterior2.push(this.TorneoExterior[i].name)
            }
        },

        PrintTorneoExterior: function (event) {
            this.datosTorneo = {};
            var x = event.target
            for (var i = 0; i < this.TorneoExterior2.length; i++) {
                if (x.getAttribute("data-index") == i) {
                    this.datosTorneo = app.TorneoExterior[i];

                }
            }
            this.MostrarDiv2('CalendarioTorneosExteriores')
            console.log(app.datosTorneo);

        },

        OcultarDiv: function () {
            var x = document.getElementById("About1");
            x.style.display = "none";
            var y = document.getElementById("About2");
            y.style.display = "none";
            var z = document.getElementById("CalendarioClases");
            z.style.display = "none";
            var m = document.getElementById("CalendarioTorneos");
            m.style.display = "none";
            var n = document.getElementById("CalendarioTorneosExteriores");
            n.style.display = "none";
            var v = document.getElementById("contacto");
            v.style.display = "none";
        },

        MostrarDiv: function (p) {
            var x = document.getElementById("Index");
            x.style.display = "none";

            var y = document.getElementById(p);
            y.style.display = "block";

        },
        MostrarDiv2: function (p) {
            var x = document.getElementById("CalendarioTorneos");
            x.style.display = "none";

            var y = document.getElementById(p);
            y.style.display = "block";

        },
        BotonVolver: function (p) {

            var x = document.getElementById("CalendarioTorneosExteriores");
            x.style.display = "none";

            var y = document.getElementById(p);

            y.style.display = "block";
        },

        login: function () {

            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider);

            console.log("login")
        },

        logout: function () {

            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                console.log("logout")
            }).catch(function (error) {
                // An error happened.
            });
        },
    }
})
