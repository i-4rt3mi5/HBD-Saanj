let flag = false
function toggle(ele, id) {
    $('.tab-pane[style*="display: block"]').fadeOut('fast',
        () => $('#'+id).fadeIn('slow'))
    $('.menu.active').removeClass('active')

    if($(ele).hasClass('menu')) {
        if(flag){
            $('#tips').fadeOut('fast',
            () => $('#link').fadeIn('slow'))
            flag = false
        }
        $(ele).addClass('active')
    } else {
        if(!flag){
            $('#link').fadeOut('fast',
            () => $('#tips').fadeIn('slow'))
            flag = true
        }
    }
}

let currentPlayer
function EvalSound(soundobj) {
    if(soundobj === 'stop') {
        currentPlayer.pause()
        currentPlayer.currentTime = 0
        return
    }
    let thissound = $('#'+soundobj).get(0)
    if(currentPlayer && currentPlayer != thissound)
        currentPlayer.pause()
    if (thissound.paused)
        thissound.play()
    if (currentPlayer != thissound)
        thissound.currentTime = 0
    currentPlayer = thissound
}

function setURL(url){ $('#view').attr('src', url) }
function check() {
    setURL(screen.width >= 720 ? 'Assets/Index/Blank.html'
    : 'https://www.youtube.com/embed/zdXiSlRrgWQ?list=PLu4obm2oOEJ3sUG3aUsTNEmZXdjlopXT4&autoplay=1&loop=1')
}
function resize() {
    screen.width < 720
        ? $('#menu').removeClass('btn-group-lg')
        : $('#menu').addClass('btn-group-lg')
}
function code() {
    const codes = []
    let game = $('#game-code')
    game.removeClass('text-success').addClass('text-white')
    codes[0] = localStorage.getItem('2048Code') == null ? '#' : localStorage.getItem('2048Code')
    codes[1] = localStorage.getItem('DinoCode') == null ? '#' : localStorage.getItem('DinoCode')
    codes[2] = localStorage.getItem('MixCode') == null ? '#' : localStorage.getItem('MixCode')
    codes[3] = localStorage.getItem('SnakeCode') == null ? '#' : localStorage.getItem('SnakeCode')
    codes[4] = localStorage.getItem('WordCode') == null ? '#' : localStorage.getItem('WordCode')
    game.text('Your Code Pieces are : '+codes)
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
    if(countOccurrences(codes, '#') == 0) {
        game.append('\n Rearrange them to get the final code.')
        game.removeClass('text-white').addClass('text-success').css('border','solid 1px #198754')
    }
}

function accessText() {
    let text = $('#passcode').val()
    if (text === btoa('54Anj')) {
        $('#main-content').fadeIn('fast', () =>
            $('.passcode').slideUp(2000, () =>
                $('#access').slideUp(1000, () =>
                    $('html, body').animate({
                        scrollTop: $('.trigger').offset().top+10
                    }, 500)
                )
            )
        )
        resize(); code()
        $('#start').click()
    } else
        alert('Invalid Code. Access Denied. Try Again.')
}
function compareText(ele) {
    let text = $('#text').val()
    if (text.toUpperCase() === '5A4NJ' || text.toUpperCase() === '54ANJ') {
        setURL('Assets/Text/')
        EvalSound('Music2')
        setTimeout(() => { EvalSound('stop') }, 70000)
        toggle(ele, 'secret')
        $('#special').removeClass('disabled')
    } else 
        alert('Invalid Code. Access Denied. Try Again.')
}
function checkEnter(event, ele, text) {
    if (event.key === 'Enter') {
        (text === 'passcode') ? accessText() : compareText(ele)
        return false
    }
}