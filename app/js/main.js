(() => {
    const app = {
        initialize() { //   Dit is hetzelfde als initialize: function () {...}
            console.log('1. Application started!')
            this.loadNavigation();
            this.loadArtists();
            this.addListener2();
            this.timer();
        },

        loadNavigation() {
            console.log('%c 2. Load Navigation ', 'background: #777; color: #bada55; padding: 5rem;');
            
            let strInnerHTML = '';

            navigation.forEach((navigation) => {
                strInnerHTML += `
                <li><a href="${navigation.link}">${navigation.name}</a></li>
                `;
            });

            document.querySelector('.top-nav').innerHTML = `<ul>${strInnerHTML}</ul>`;

        },

        loadArtists() {
            console.log('3. Cache elements!')

            this.$containerConcerts = document.querySelector('.container-concerts');
            this.$concertDetails = document.querySelector('.concert-details');

            let strInnerHTML = '';

            lineup.forEach((lineup) => {
                strInnerHTML += `
                <div class="container-artist"><h2>${lineup.artist.name}</h2>
                <p>${lineup.place.name}</p>
                <img src="${lineup.artist.picture.large}"></div>
                `
            });

            document.querySelector('.container-concerts').innerHTML = strInnerHTML;
        },

        addListener2: function () {
            let containers = document.querySelector('.container-concerts');
            console.log(containers);

            // laat u door loopen
            let artList = containers.querySelectorAll('.container-artist');
            console.log(artList);

            let concert;
            for (let i = 0; i < artList.length; i++) {
                concert = artList[i];
                concert.addEventListener("click", (event) => {
                    concert.id = i;
                    let id = concert.id;
                    this.showDetails(id);
                })
            }
        },

        showDetails: function (id) {
            console.log('starting onclick');

            let str = '';

            str += `<img src="${lineup[id].artist.picture.small}" alt="">
            <h1>${lineup[id].artist.name}</h1>
            <p>${lineup[id].artist.synopsis}</p>
            ${lineup[id].artist.media[0].sourceId}
            <h2>Socials:</h2>
            <ul>
            `;
            /*
            for (i = 0; i < lineup.artist.social; i++) {
                strInnerHTML += `<li>${lineup.artist.social[i]}</li>`;
            }

            strInnerHTML += `</ul>`;*/

            this.$concertDetails.innerHTML = str;
        },


        // test code van Thibault
        // addListener: function () {
        //     console.log('%c4. eventlisteners attaching','background: #777; color: #bada55; padding: 5rem;');
            
        //     this.$containerConcerts.forEach(($h1ArtisName, index) => {
        //         $h1ArtisName.addEventListener('click', (event) => {
        //             const id = event.target.parentNode.dataset.id;
        //             this.showConcertDetails(id);
        //         });
        //     });
        // },

        // showConcertDetails: function (id) {
        //     const concert = lineup.find((concert) => concert.id === id);
        //     this.$concertDetails.innerHTML = `
        //     Details for ${concert.artist.name}
        //     Sysnopsis: ${concert.artist.synopsis}
        //     ${lineup.artist.name}
        //     `;
        // },

        timer: function () {
            const finalDate = new Date("Jul 1, 2021 12:00:00").getTime();

            const findDifference = setInterval(function () {

                const now = new Date().getTime();

                const timeDifference = finalDate - now;

                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);


                // document.getElementById("digitalCountdown").innerHTML = days + "days " + hours + "h " + minutes + "m " + seconds + "s ";
                document.querySelector('#digitalCountdown').innerHTML = `${days} days ${hours}h ${minutes}m ${seconds}s`;

                if (timeDifference < 0) {
                    clearInterval(x);
                    document.getElementById("digitalCountdown").innerHTML = "Lets get this show on the road!";
                }
            }, 1000);
        }
    }

    app.initialize();
})();