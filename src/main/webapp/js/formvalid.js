$(document).ready(function () {

    // 验证颜色
    var warning = '#dc3545';
    var good = '#28a745';

   // 验证必填字段
   $('.require').blur(function () {
       if ($(this).val() === null || $(this).val().trim() === '') {
           setClass($(this), 'none', 'none', 'block',warning);
       } else if ($(this)[0].name === 'tel'
           || $(this)[0].name === 'email'
           || ($(this)[0].name === 'cardnum' && $('#cardtype').val() === '身份证')){
           if (testReg($(this)) === true) {
               setClass($(this),'none', 'block', 'none', good);
           } else {
               setClass($(this),'block', 'none', 'none', warning);
           }
       } else {
           setClass($(this),'none', 'block', 'none', good);
       }
   });

    // 证件类型改变时，清空证件输入
    $('#cardtype').change(function () {
        $('#cardnum').val('');
        setClass($('#cardnum'), 'none', 'none', 'block',warning);
    });

   var reg = {
       cardnum: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
       tel: /^1[34578]\d{9}$/,
       email: /^\w+@\w+.\w+$/
   };
    var arr = [
        document.getElementsByName('cardnum')[0],
        document.getElementsByName('tel')[0],
        document.getElementsByName('email')[0]
    ];

    // 针对wrong, valid, invalid改变状态
    function setClass(item, wrong, valid, invalid, color) {
        item.siblings('.login-form-content-item-wrong').css('display',wrong);
        item.siblings('.login-form-content-item-valid').css('display',valid);
        item.siblings('.login-form-content-item-invalid').css('display', invalid);
        item.css('border-color', color)
    }
    // 正则表达式验证
    function testReg(item) {
        if (item.val()) {
            console.log("result：" + reg[item[0].name].test(item.val()));
            if (reg[item[0].name].test(item.val())) {
                item.siblings('.login-form-content-item-valid').css('display','block');
                item.siblings('.login-form-content-item-wrong').css('display','none');
                item.siblings('.login-form-content-item-invalid').css('display','none');
                item.css('border-color', '#28a745');
                return true;
            } else {
                item.siblings('.login-form-content-item-valid').css('display','none');
                item.siblings('.login-form-content-item-wrong').css('display','block');
                item.siblings('.login-form-content-item-invalid').css('display','none');
                item.css('border-color', '#dc3545');
                return false;
            }
        }
    }
});