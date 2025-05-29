export default function requestLogger(){
    return function(req,res,next){ 
        console.log('>> HTTP Request :' + req.method + ' ' + req.url ,
            ', query : ' , req.query,
            ', params : ',req.params,
            ', body (post) :' , req.body

        )
        next();
    }   
}