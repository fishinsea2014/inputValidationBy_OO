/**
     * @author Jason Qu
     * Validate input form by the way of objected oriented.
     */


     var validatorObj={
         init: function() {
            this.valicateInputForm();
            this.submitForm();
         },

         formEvent: function(cur, value, name, reg){
             if (value == ''){
                cur.siblings('.tip-error').show().text(name + ' can not be empty');
             }else if(!reg.test(value)){  //When not validate
                 cur.siblings(".tip-error").show().text(name + ' is not valid.')
             }else{
                 cur.siblings(".tip-error").hide();
             }
         },
         
         valicateInputForm: function(){
             var self = this;

             //When being fucused
             $(".list li input").on('focus', function(){
                $(this).siblings(".tip-error").hide();
             });

             //when not being fucused
             $(".list li input").blur(function(){
                var name = $(this).prev().text();
                var reg;
                switch ($(this).attr("name")){
                    case "name":
                        reg = /^[\u4e00-\u9fa5]{2,4}$/;
                        break;
                    case "mobile":
                        reg = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
                        break;
                    case "email":
                    reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    break;
                case "age":
                    reg = /^(?:[1-9]?\d|100)$/;
                    break;
                }
                self.formEvent($(this), $(this).val(), name, reg);
             });
         },

         submitForm: function(){
             $(".list .btn-submit").on('click', function(){
                 var _name = $.trim($(".name").val()),
                 _mobile = $.trim($(".mobile").val()),
                _email = $.trim($(".email").val()),
                _age = $.trim($(".age").val()),
                _address = $.trim($(".address").val());
            var data ={
                name:_name,
                mobile:_mobile,
                email:_email,
                age:_age,
                address:_address
            };
            if(_name==''|| _mobile=='' || _email =='' || $(".tip-error").is(":visible")) {
                alert("The infomation input is not valid.");
            }else {
                $.ajax({
                    type: "POST", 
                    url: "http://localhost:5500/form_info", 
                    async: true, 
                    data: data,  
                    dataType: 'json', 
                    success: function (msg) {
                        if(msg.code =='200'){
                            console.log('Submit success.')
                        }
                    },
                    error: function (err) {
                        console.log('Submit failed', err);
                    }
                });
            }   
             })
         }
     }


     $(function(){
         validatorObj.init();

     });