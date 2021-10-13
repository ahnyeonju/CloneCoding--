/*
 * upload.js with dmUploader and bootstrap 3
 *
 * Author : Ryan
 */
(function($) {

    $.fn.upload = function(callback) {
        if ($(this).attr('data-armgno') === '0' || $(this).attr('data-type') === '8') {
            var maxCnt = '20';
        } else {
             var maxCnt = '15';
        }

        if ($('#room-images li').length >= maxCnt) {
            alert('이미지는 최대 '+maxCnt+'개 까지만 등록이 가능합니다.');
            return;
        }

        if (!jQuery().dmUploader) {
            alert('dmUploader 플러그인이 로드되지 않았습니다.');
            return;
        }

        var remainCnt = parseInt(maxCnt) - $('#room-images li').length;

        return this.each(function() {


            $('#drag-and-drop-zone').off();
            $('#img-uploader').remove();

            $data = {}; // data-adino="1" data-ano="1" data-armno="2"
            if ($(this).attr('data-adino')) $data.adino = $(this).attr('data-adino');
            if ($(this).attr('data-ano')) $data.ano = $(this).attr('data-ano');
            if ($(this).attr('data-armgno')) $data.armgno = $(this).attr('data-armgno');
            if ($(this).attr('data-type')) $data.type = $(this).attr('data-type');

            if ($data.armgno === '0' || $data.type === '8') {
                var typeText = '<strong>&nbsp;&nbsp;<font color="#ff0000">최대 20장 까지 등록이 가능합니다.</font></strong><br />';
            } else {
                 var typeText = '<strong>&nbsp;&nbsp;<font color="#ff0000">최대 15장 까지 등록이 가능합니다.</font></strong><br />';
            }


            $modal = '<div id="img-uploader" class="modal fade">' +
                '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                            '<h4 class="modal-title">이미지 업로드</h4>' +
                        '</div>' +
                        '<div class="modal-body" style="height:300px">'+
                            '<div id="drag-and-drop-zone" style="height:200px;border:1px dashed gray;border-radius:3px;position:relative">' +
                                '<label style="position:relative;left:50%;margin-left:-100px;top:50%;margin-top:-15px;overflow:hidden">' +
                                    '<span class="btn btn-primary">드래그 하시거나 클릭하세요.</span>' +
                                    '<input style="position:absolute;left:0;top:0;border-width: 0 0 100px 200px;border:solid transparent;direction: ltr;opacity:.0;cursor:pointer" type="file" name="files[]" multiple="multiple" title="Click to add Files">' +
                                '</label>' +
                            '</div>' +
                            '<div id="upload-list" style="margin-top:10px"></div>' +
                                '<span>* 여러장을 한꺼번에 드래그하여 업로드 할 수 있습니다. <br />'+
                                typeText +
                                '<strong>&nbsp;&nbsp;사진 권장사이즈 : 1920 * 1080 또는 960 * 540</strong></span>' +
                                '<span class="btn btn-success" , data-dismiss="modal" aria-label="Close" style="float: right; margin-top:-25px;">확인</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            if ($('#img-upload').length == 0) {
                $($modal).appendTo('body');
            }

            $('#img-uploader').modal();

            $('#drag-and-drop-zone').dmUploader({
                url: '/guest/upload',
                dataType: 'json',
                allowedTypes: 'image/*',
                extraData : $data,
                maxFiles : remainCnt,
                onInit: function() {},
                onBeforeUpload: function(id){
                    $('#uploadFile' + id).find('span.status').html('업로드 중');
                },
                onNewFile: function(id, file){
                    var template = '' +
                        '<div class="file" id="uploadFile' + id + '">' +
                        '<div class="info"><span>파일명 : ' + file.name + ' 사이즈 : ' + file.size + ' bytes </span><br /><small>상태 : <span class="status">Waiting</span></small></div>' +
                        '<div class="bar">' +
                          '<div class="progress" style="width:0%;background-color:#00CCFF"></div>' +
                        '</div>' +
                        '</div>';
                    $('#upload-list').prepend(template);
                    $('.modal-body').css('height', '355px');
                },
                onComplete: function() {},
                onUploadProgress: function(id, percent){
                    $('#uploadFile' + id).find('div.progress').width(percent + '%');
                },
                onUploadSuccess: function(id, data){
                    $('#uploadFile' + id).find('div.progress').width(100 + '%');
                    $('#uploadFile' + id).find('span.status').html('완료');
                    callback(data);
                },
                onUploadError: function(id, message) {
                    // update_file_status(id, 'error', message);
                },
                onFileTypeError: function(file) {
                    // add_log('File \'' + file.name + '\' cannot be added: must be an image');
                },
                onFileSizeError: function(file) {
                    // add_log('File \'' + file.name + '\' cannot be added: size excess limit');
                },
                onFallbackMode: function(message) {
                    // alert('Browser not supported(do something else here!): ' + message);
                }
            });

        });
    }
})(jQuery);