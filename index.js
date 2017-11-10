// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const meow = require( 'meow' );

// Project
const { Election } = require( './lib' );


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const cli = meow();
const election = new Election();

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/**
 * Function prints arguments to stdout when process is running in `debug` mode.
 */
/// TODO: Move into dedicated `utils` module.
function debug() {
    if ( cli.flags.debug ) {
        console.log( ...( Array.prototype.slice.call( arguments, 0 ) ) );
    }
}

// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------
election.run()
    .then( data => { console.log( data ); } )
    .catch( err => { console.log( err.message ); } );
