const booking = require('../model/user_model')

module.exports.booked_data = async (req,res)=>{
     const bookingData = await booking.create(req.body)
     if(bookingData){
          res.cookie('movieid',req.body.movieId)
          return res.redirect('/booking/ticket')
     }
}
module.exports.ticket = async (req,res)=>{
     const date_ = new Date()
     const day = ("0" + date_.getDate()).slice(-2);
    const month = ("0" + (date_.getMonth() + 1)).slice(-2);
    const year = date_.getFullYear();
    const date = day + "-" + month + "-" + year;
    console.log(req.body.movieId)
    let movie = req.cookies.movieid
    const booking_Data = await booking.findOne({movieId:movie}).populate('movieId').exec();
    console.log(booking_Data)
    return res.render('ticket',{
     data : booking_Data,
     movieid : movie
    })

}