const date = () => {

    const time = new Date();

   let getDay = time.getDay();

   let getDate = time.getDate();

   let getMonth = time.getMonth();

    let getYear = time.getFullYear();

    let day;

    switch (getDay) {
      case 1:
        day  = 'Monday';
        break;
      case 2:
        day  = 'Tuesday';
        break;
      case 3:
        day  = 'Wednesday';
        break;
      case 4:
        day  = 'Thursday';
        break;
      case 5:
        day  = 'Friday';
        break;
      case 6:
        day  = 'Saturday';
        break;
      case 0:
        day  = 'Sunday';
        break;
      default:
        break;
    }
    
    let month;

    switch (getMonth) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 6:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;      
    }
    
    let todaysDate = getDate + " " + month + " " + getYear;

    return todaysDate;

}

module.exports= date();