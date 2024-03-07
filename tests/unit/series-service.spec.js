import SeriesService from "@/seriesService/tv-service.js";

describe('Service Class Testing', () => {
    beforeEach(()=>{
    })
   test ('get api to get series list', async(done)=>{
       try{
        const SeriesService1 = new SeriesService();
           const response=await SeriesService1.seriesList();
           expect(response.data).toBeInstanceOf(Array)
             done();
       } catch(error){
           done.fail(error)
       }
   })
   test ('get api to get series list on search', async(done)=>{
    try{
     const SeriesService1 = new SeriesService();
        const response=await SeriesService1.serachList('b');
        expect(response.data[0]).toBeInstanceOf(Object)
          done();
    } catch(error){
        done.fail(error)
    }
})
test ('api to get details of the series', async(done)=>{
    try{
     const SeriesService1 = new SeriesService();
        const resp1=await SeriesService1.seriesDetails(211);
        expect(resp1.data).toBeInstanceOf(Object)
        done();
    } catch(error){
        done.fail(error)
    }
})
test ('api to get series Casts details', async(done)=>{
    try{
     const SeriesService1 = new SeriesService();
        const response=await SeriesService1.seriesCastDetails(211);
        expect(response.data).toBeInstanceOf(Object)
          done();
    } catch(error){
        done.fail(error)
    }
})
test ('get api to get series cast details', async(done)=>{
    try{
     const SeriesService1 = new SeriesService();
        const response=await SeriesService1.seriesEpisodesDetails(211);
        expect(response.data).toBeInstanceOf(Object)
          done();
    } catch(error){
        done.fail(error)
    }
})
  })