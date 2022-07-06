const express = require('express')
const router = express.Router()
const request = require('request');
const config = require('config')

const Data = require('../models/Data');

router.get('/', (req, res) => res.render('home'));

router.post('/albums', (req, res) => {
    const {query, filter} = req.body;

    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        qs: {
          q: query,
          type: filter,
          offset: '0',
          limit: '10',
          numberOfTopResults: '5'
        },
        headers: {
          'X-RapidAPI-Key': '13170534c5mshee537a9cefa7176p1adcbejsnc5e02ba9f040',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          useQueryString: true
        }
      };
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
      
        music = JSON.parse(body)
        
        const arr = music['albums']['items']
        //for(i = 0; i < arr.length; i ++) {
            //console.log(arr[i]['data']['name'])

            //console.log(titles)
            //var musicTitle = arr[i]['data']['name'];
            //musicTitle.push(titles)
            //console.log(musicTitle)
            

            // const arr2 = arr[i]['data']['coverArt']['sources']
            // for (j = 0; j < arr2.length; j++) {
            //     //console.log(arr2[j]['url'])

            //     const covers = []

            //     covers.push(arr2[j]['url'])

            //     //console.log(covers)
                
            //     const uniqueCovers = []

            //     const unique = covers.filter(element => {
            //         const isDuplicate = uniqueCovers.includes(element.id);

            //         if (!isDuplicate) {
            //             uniqueCovers.push(element.id)

            //             return  console.log(uniqueCovers)
            //         }
                    
            //     })
                //console.log(uniqueCovers)
                //data = Data.insertMany({albumCover:uniqueCovers})

              

                //var deetz = []
                //deetz.push(musicTitle, albumCover)
                //console.log(deetz)

               
               
                
            }
           
        }
      });

    
    
})



module.exports = router