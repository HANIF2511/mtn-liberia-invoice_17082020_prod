

var ParamConfig ={
  DateFormat  : "yyyy/MM/dd",
  PrvUserFlow : "PRV_BLD",
  PrvUserCDR : "PRV_CDR",
  ORDER_STATUS_CREATED: 10,
  MAC_ADDR: '5c:51:4f:7a:7a:d3',
  Voice: {},
  Data: {}

  //masterGridHeight : "250",
  //childGridHeight : "250"
  //DateFormat  : "yyyy MMM d"
}

  function getParamConfig_voice (){
    return ParamConfig.Voice;
  }
  function getParamConfig_mac (){
    return ParamConfig.MAC_ADDR;
  }

  function getParamConfig_data (){
    return ParamConfig.Data;
  }

  function setParamConfig (paramas,inv_voice){
    // console.log("setParamConfig")
  //  console.log(paramas);
    
    ParamConfig[paramas] = inv_voice;
    
  //  console.log(ParamConfig);
     
  }

   function date_format()
  {
  let current_datetime = new Date()
  // curr_date = new Date().setDate( d.getDate() - 1 ).getDate();
let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear();
console.log(formatted_date);
return(formatted_date);
  }

  function isDateRangeEqualToLeapYear(year)
  {
    return !((year % 4) && (year % 100) || !(year % 400));
  }
  
  function get_last_day(num)
  {
  var num_days =  [0,31,28,31,30,31,30,31,31,30,31,30,31]
   
   var dateObj = new Date();
      var year = dateObj.getFullYear();
  
    var i = isDateRangeEqualToLeapYear(year);
      dateObj.setDate(0);
  
      var month = dateObj.getMonth() + 1;
  
      month = month - num;
      
      var day = dateObj.getDate();
  
      day = num_days[month];
  
       if(i == true && month ==2)
       day = 29
        if(i == false && month ==2)
       day = 28
  
  
        var ddd = month.toString();
     if(ddd.length ==1)
     month = '0'+month;
    var  newdate = day + "/" + month + "/" + year;
    console.log(newdate)
    return(newdate)
    }


    function print_detdata(str) {

var j=0;
var result="";
var queryrows2="";
var n;
var tmp;
var allRows2 = [];
var obj;
var jsonbasex="";
var output1="" ;
var output2="";
var output3="";
var output4="";
var output5="";
var output6="";
var output7="" ;
const xml2js = require('xml2js');

for (var i=0;i<str.length;i++)
           {
           result =  xml2js.parseString(str[i], { mergeAttrs: true } , (err,result) => {

           if(err) {
        throw err;
                    }
           jsonbasex = JSON.stringify(result, null, 4);
       
   
           obj = JSON.parse(jsonbasex);

		   output3 = obj.DETAILS.NUMBER;
		    output3 = output3.toString();
			
			if(output3 === "LTEGPRS" || output3 === "GPRS")
			{
           output1 = obj.DETAILS.DATE;
		   output2 = obj.DETAILS.TIME;
           
		    output4 = obj.DETAILS.DESCRIPTION;
			 output5 = obj.DETAILS.CALLTYPE;
           output6 = obj.DETAILS.DURATION;
           output7 = obj.DETAILS.AMOUNT;

		    output1 = output1.toString();
			 output2 = output2.toString();
			 
			   output4 = 'Data';
			    output5 = output5.toString();
				output5 = "001";
				 output6 = output6.toString();
				  output7 = output7.toString();

      
        queryrows2 = 
					{
					"DATE": output1,
					"TIME": output2,
					"BSUBNO":  output3,
					"DESCRIPTION":  output4,
					"CALLTYPE":  output5,
                    "DURATION":  output6,
					"AMOUNT": output7
									                  
					}
        allRows2.push(queryrows2);

    

				}

	 
                      });

			
         }
         
return(allRows2);

    }

