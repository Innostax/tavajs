
 
  const find = (req, res, next) => {
    
      
        
        res.send('find called');
     

  }
  
  const create =(req, res, next) => {
    
      
       
        res.send('create  Called')
     
  }
  
  const patch =(req, res, next) => {
    
      
        
        res.send('patch Called')
       
  }
  
  const remove =(req, res, next) => {
    
      
         
        res.send('remove Called')
     
  }
  
  const removeById =(req, res, next) => {
    
       
        
        res.send('remove by id Called')
     
    
  }
  
  const findById = (req, res, next ) => {
    
      
        
        res.send('find by id Called')
     
    
  }
  
  module.exports = {
      find,
      create,
      patch,
      remove,
      findById,
      removeById
    };