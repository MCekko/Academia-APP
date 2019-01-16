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
        mensaje: "",

    },
    created: function () {
        this.getData();
        this.PrintName();
        this.hideDiv();
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
            this.ShowDiv('CalendarioTorneos', 'CalendarioTorneosExteriores')
            console.log(app.datosTorneo);

        },

        hideDiv: function () {
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
            var q = document.getElementById("Index2");
            q.style.display = "none";
            var a = document.getElementById("botonChat");
            a.style.display = "none";
            var b = document.getElementById("Chat");
            b.style.display = "none";
        },

        ShowDiv: function (p, b) {
            var x = document.getElementById(p);
            x.style.display = "none";

            var y = document.getElementById(b);
            y.style.display = "block";

        },

        login: function () {
            var x = document.getElementById("login2");
            x.style.display = "none";

            var y = document.getElementById("Index2");
            y.style.display = "block";
            var x = document.getElementById("login2");
            x.style.display = "none";

            var y = document.getElementById("botonChat");
            y.style.display = "block";

            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider);

            console.log("login")
        },

        logout: function () {
            var x = document.getElementById("Index2");
            x.style.display = "none";

            var y = document.getElementById("login2");
            y.style.display = "block";

            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                console.log("logout")
            }).catch(function (error) {
                // An error happened.
            });
        },



        writeNewPost: function () {

            // https://firebase.google.com/docs/database/web/read-and-write
            // Values
            var text = this.mensaje;
            
            // filtro de contenido
            if (text.length == 0)
                return;
            if (text.trim().length == 0)
                return;
            if (text.includes("joder"))
                {
                    alert("Este chat no permite palabras ofensivas");
                    return;
                }
            
            //mensaje//
            var userName = firebase.auth().currentUser.displayName;
            // funcion de firebase//

            // A post entry

            var post = {
                name: userName,
                text: text
            };

            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('General').push().key;

            //Write data
            var updates = {};
            updates[newPostKey] = post;

            return firebase.database().ref('General').update(updates);

        },


        getPosts: function () {

            this.writeNewPost();
            document.getElementById("PushText").scrollTop = document.getElementById("PushText").scrollHeightz;
            firebase.database().ref('General').on('value', function (data) {

                //div donde esta mi sala de chat
                var posts = document.getElementById("PushText");


                posts.innerHTML = "";

                var messages = data.val();

                for (var key in messages) {

                    var userName = firebase.auth().currentUser.displayName;
                    var text = document.createElement("div");
                    var element = messages[key];

                    text.append(element.name + ":" + " " + element.text);
                    posts.append(text);
                    
                    document.getElementById("PushText").scrollTop = document.getElementById("PushText").scrollHeightz;
                    
                }

            })

            var borrarInput = document.getElementById("mensaje2");
            borrarInput.value = "";
            this.mensaje = "";

            console.log("getting posts");

        },

    }
})
// css para cortar palabra//