class  ApiFeatures {
   constructor(query, queryStr){
           this.query = query;
           this.queryStr = queryStr

   }

   search(){
    let keyword = this.queryStr.keyword ? {
        name:{
            $regex :this.queryStr.keyword,
            $options:"i", //case incensive - convert the search product namee convert small or capital

        }
    }:{}

    this.query.find({...keyword});
    return this;
   }

   filter(){
    const copyQueryString = {...this.queryStr};  /// copy the query string

    const removeFields = ["keyword",'limit','page']

   removeFields.forEach(fields => delete copyQueryString[fields]);
   
   let  queryStr = JSON.stringify(copyQueryString);
 
    //console.log('copyQueryString',copyQueryString);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)
    //console.log("queryStr",queryStr);
    this.query.find(JSON.parse(queryStr));
    return this;
   }

   pagination(perPage){
     const currentPage = Number(this.queryStr.page)|| 1;
     const skip = perPage * (currentPage - 1);  //2 * 2 -1
     this.query.limit(perPage).skip(skip);
     return this;
   }
}

module.exports = ApiFeatures;