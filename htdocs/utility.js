// Utils JavaScript file

function getQueryNum() {

    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('query');  
}

function getDatabase() {

    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('db');
  
}
function getSession() {

  var urlParams = new URLSearchParams(window.location.search);
 
  if (urlParams.has("db")) {

    var database = urlParams.get('db');


    if (database == 'neo4j') {
      const driver = neo4j.driver(
            'neo4j://localhost:7687',
             neo4j.auth.basic('neo4j', 'password')
           );
      const session = driver.session({
            database: 'neo4j',
            defaultAccessMode: neo4j.session.READ
      });
      return session;
    } else if (database == 'mongodb') {
        // pass
    } else if (database == 'sql') {
        // pass
    }

  } else {
    // Pass
  }

        
  
}