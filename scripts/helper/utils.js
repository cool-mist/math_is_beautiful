/*General purpose util methods*/
function getUtil(){
    return {
        mid : function(x1, x2){
            return (x1 + x2)/2;
        },

        boundedIncrement : function (val, increment, min, max){
            val += increment;
            
            if(val <= min){
                return min;
            }

            if(val >= max){
                return max;
            }

            return val;
        } 
    }
}