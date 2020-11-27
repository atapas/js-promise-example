
import {
    ALL_POKEMONS_URL, 
    BULBASAUR_POKEMONS_URL,
    RATICATE_POKEMONS_URL,
    KAKUNA_POKEMONS_URL,
    POKEMONS_BAD_URL
} from './pokemon.js';

const error_off = false;

/**
 * This method create a Promise and returns it. It accepts 
 * an URL to make the XMLHttp call and retrun the response
 * in form of the Promise. If there is any errors, it rejects.
 */
function getPromise(URL) {
  let promise = new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", URL);
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject("There is an Error!");
      }
    };
    req.send();
  });

  return promise;
}

{
    // This will resolve and we will get the result
    let promise = getPromise(ALL_POKEMONS_URL);
    promise.then(
        (result) => {
        console.log({ result });
        },
        (error) => {
        console.log("We have encountered an Error!");
        }
    );
}


{
    // This will reject as the URL is 404
    let promise = getPromise(POKEMONS_BAD_URL);
    promise.then(
        (result) => {
            console.log({result});
        },
        (error) => {
            console.log('We have encountered an Error!');
        }
    )
}

{
    // Here is an example with catch
    let promise = getPromise(POKEMONS_BAD_URL);
    promise.catch((error) => {
            console.log('We have encountered an Error!');
    })
}


{
    // .then() .catch() and .finally()
    let loading = true;
    let promise = getPromise(ALL_POKEMONS_URL);
    loading && console.log('Loading...');

    promise.finally(() => {
        loading = false;
        console.log(`Promise Settled and loading is ${loading}`);
    }).then((result) => {
        console.log({result});
    }).catch((error) => {
        console.log(error)
    });
}

{
    // Promise Chain with then and catch
    let promise = getPromise(ALL_POKEMONS_URL);

    promise.then(result => {
        let onePokemon = JSON.parse(result).results[0].url;
        return onePokemon;
    }).then(onePokemonURL => {
        console.log(onePokemonURL);
    }).catch(error => {
        console.log('In the catch', error);
    });
}

{
    // Promise Chain with multiple then and catch
    console.log('Promise Chain with multiple then and catch');
    let promise = getPromise(ALL_POKEMONS_URL);

    promise.then(result => {
        let onePokemon = JSON.parse(result).results[0].url;
        return onePokemon;
    }).then(onePokemonURL => {
        console.log(onePokemonURL);
        return getPromise(onePokemonURL);
    }).then(pokemon => {
        console.log(JSON.parse(pokemon));
    }).catch(error => {
        console.log('In the catch', error);
    });
}

{
    // Promise .then, no chain
    console.log('Promise .then, no chain');
    let promise = getPromise(ALL_POKEMONS_URL);

    promise.then(result => {
        let onePokemon = JSON.parse(result).results[0].url;
        return onePokemon;
    })
    promise.then(onePokemonURL => {
        console.log(onePokemonURL);
        return getPromise(onePokemonURL);
    })
    promise.then(pokemon => {
        console.log(JSON.parse(pokemon));
    })
}

{
    let promise_1 = getPromise(BULBASAUR_POKEMONS_URL);
    let promise_2 = getPromise(RATICATE_POKEMONS_URL);
    let promise_3 = getPromise(KAKUNA_POKEMONS_URL);

    Promise.all([promise_1, promise_2, promise_3]).then(result => {
        console.log({result});
    }).catch(error => {
        console.log('An Error Occured');
    });

    Promise.any([promise_1, promise_2, promise_3]).then(result => {
        console.log(JSON.parse(result));
    }).catch(error => {
        console.log('An Error Occured');
    });

    Promise.allSettled([promise_1, promise_2, promise_3]).then(result => {
        console.log({result});
    }).catch(error => {
        console.log('An Error Occured');
    });

    Promise.race([promise_1, promise_2, promise_3]).then(result => {
        console.log('Race', JSON.parse(result));
    }).catch(error => {
        console.log('An Error Occured');
    });
}

