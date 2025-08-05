// Constants
const CONSTANTS = {
    SCROLL_THRESHOLD: 50,
    MOBILE_SCROLL_BUFFER: 130,
    DESKTOP_SCROLL_BUFFER: 80,
    MAX_FILE_SIZE: 1024 * 1024 * 2, // 2MB
    MAX_RETRY_COUNT: 3,
    RETRY_DELAY: 2000
};

// File type configurations
const FILE_TYPES = {
    video: ["mp4", "webm", "avi", "mpg", "mpeg", "mkv", "rm", "rmvb", "mov", "wmv", "asf", "ts", "flv", "3gp", "m4v"],
    audio: ["mp3", "flac", "wav", "ogg", "m4a", "aac", "wma", "alac"],
    image: ["bmp", "jpg", "jpeg", "png", "gif", "svg", "tiff", "ico"],
    code: ["php", "css", "go", "java", "js", "json", "txt", "sh", "md", "html", "xml", "py", "rb", "c", "cpp", "h", "hpp"],
    zip: ["zip", "rar", "tar", "7z", "gz"],
    pdf: ["pdf"],
    markdown: ["md"]
};

function init() {
    document.siteName = $('title').html();
    const htmlTemplate = createMainHTMLTemplate();
    $('body').html(htmlTemplate);
    initializeBackToTopButton();
    
    // Initialize global variables with default values if not set
    if (!window.current_drive_order) {
        window.current_drive_order = 0;
    }
    
    if (!window.MODEL) {
        window.MODEL = {
            is_search_page: false,
            q: '',
            root_type: 0
        };
    }
    
    // Add search form handler
    $(document).on('submit', '#search_bar_form', function(e) {
        e.preventDefault();
        const query = $(this).find('input[name="q"]').val();
        if (query && query.trim() !== '') {
            const currentDrive = window.current_drive_order || 0;
            window.location.href = `/${currentDrive}:search?q=${encodeURIComponent(query.trim())}`;
        }
    });
    
    // Add a global test function for debugging
    window.testSearch = function(query) {
        window.MODEL.is_search_page = true;
        window.MODEL.q = query || 'test';
        render_search_result_list();
    };
}

function createMainHTMLTemplate() {
    return `
    <header>
        <div id="nav"></div>
    </header>
    <div class="loading" id="spinner" style="display:none;">Loading&#8230;</div>
    <main id="content" style="padding-top: 20px;"></main>
    ${createSearchModal()}
    ${createBackToTopButton()}
    ${createFooter()}
    </body>`;
}

function createSearchModal() {
    return `
    <div class="modal" id="SearchModel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="SearchModelLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body" id="modal-body-space"></div>
                <div class="modal-footer" id="modal-body-space-buttons"></div>
            </div>
        </div>
    </div>`;
}

function createBackToTopButton() {
    return `
    <button id="back-to-top" class="btn btn-secondary btn-lg shadow border border-light" 
            style="position: fixed; bottom: 85px; right: 10px; display: none; z-index: 1;" role="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
        </svg>
    </button>`;
}

function createFooter() {
    return `
    <footer class="footer text-center mt-auto container bg-primary" 
            style="border-radius: .5rem .5rem 0 0; border: 1px solid rgba(140, 130, 115, 0.13);">
        <div class="container" style="padding-top: 15px;">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <p>© ${new Date().getFullYear()} - <span style="color: #00BC8C;">SPRiNGLER</span>, All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </footer>`;
}

function initializeBackToTopButton() {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;

    window.onscroll = () => handleScroll(backToTopBtn);
    backToTopBtn.addEventListener("click", scrollToTop);
}

function handleScroll(button) {
    const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    button.style.display = scrollPosition > CONSTANTS.SCROLL_THRESHOLD ? "block" : "none";
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
const folder_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#__lottie_element_11)"><g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,24,24)"><path fill="rgb(255,159,0)" fill-opacity="1" d=" M16,-12 C16,-12 -2,-12 -2,-12 C-2,-12 -6,-16 -6,-16 C-6,-16 -16,-16 -16,-16 C-18.200000762939453,-16 -20,-14.199999809265137 -20,-12 C-20,-12 -20,12 -20,12 C-20,14.208999633789062 -18.208999633789062,16 -16,16 C-16,16 13.682000160217285,16 13.682000160217285,16 C13.682000160217285,16 20,5 20,5 C20,5 20,-8 20,-8 C20,-10.199999809265137 18.200000762939453,-12 16,-12z"></path></g></g><g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,24,26)"><path fill="rgb(255,201,40)" fill-opacity="1" d=" M16,-14 C16,-14 -16,-14 -16,-14 C-18.200000762939453,-14 -20,-12.199999809265137 -20,-10 C-20,-10 -20,10 -20,10 C-20,12.199999809265137 -18.200000762939453,14 -16,14 C-16,14 16,14 16,14 C18.200000762939453,14 20,12.199999809265137 20,10 C20,10 20,-10 20,-10 C20,-12.199999809265137 18.200000762939453,-14 16,-14z"></path></g></g></g></svg>`
const video_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#__lottie_element_11)"><g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(63,81,181)" fill-opacity="1" d=" M16,17 C16,17 -16,17 -16,17 C-18.200000762939453,17 -20,15.199999809265137 -20,13 C-20,13 -20,-9 -20,-9 C-20,-9 20,-9 20,-9 C20,-9 20,13 20,13 C20,15.199999809265137 18.200000762939453,17 16,17z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M16,-9 C16,-9 12,-3 12,-3 C12,-3 16,-3 16,-3 C16,-3 20,-9 20,-9 C20,-9 16,-9 16,-9z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M8,-9 C8,-9 4,-3 4,-3 C4,-3 8,-3 8,-3 C8,-3 12,-9 12,-9 C12,-9 8,-9 8,-9z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M0,-9 C0,-9 -4,-3 -4,-3 C-4,-3 0,-3 0,-3 C0,-3 4,-9 4,-9 C4,-9 0,-9 0,-9z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M-8,-9 C-8,-9 -12,-3 -12,-3 C-12,-3 -8,-3 -8,-3 C-8,-3 -4,-9 -4,-9 C-4,-9 -8,-9 -8,-9z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M-16,-9 C-16,-9 -20,-3 -20,-3 C-20,-3 -16,-3 -16,-3 C-16,-3 -12,-9 -12,-9 C-12,-9 -16,-9 -16,-9z"></path></g></g></g><g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(63,81,181)" fill-opacity="1" d=" M19.399999618530273,-15.699999809265137 C19.399999618530273,-15.699999809265137 -20,-9 -20,-9 C-20,-9 -20.299999237060547,-11 -20.299999237060547,-11 C-20.700000762939453,-13.199999809265137 -19.200000762939453,-15.199999809265137 -17,-15.600000381469727 C-17,-15.600000381469727 14.600000381469727,-20.899999618530273 14.600000381469727,-20.899999618530273 C16.799999237060547,-21.299999237060547 18.799999237060547,-19.799999237060547 19.200000762939453,-17.600000381469727 C19.200000762939453,-17.600000381469727 19.399999618530273,-15.699999809265137 19.399999618530273,-15.699999809265137z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M-5.199999809265137,-17.600000381469727 C-5.199999809265137,-17.600000381469727 -0.30000001192092896,-12.300000190734863 -0.30000001192092896,-12.300000190734863 C-0.30000001192092896,-12.300000190734863 3.700000047683716,-13 3.700000047683716,-13 C3.700000047683716,-13 -1.2999999523162842,-18.299999237060547 -1.2999999523162842,-18.299999237060547 C-1.2999999523162842,-18.299999237060547 -5.199999809265137,-17.600000381469727 -5.199999809265137,-17.600000381469727z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M-13.100000381469727,-16.299999237060547 C-13.100000381469727,-16.299999237060547 -8.199999809265137,-11 -8.199999809265137,-11 C-8.199999809265137,-11 -4.199999809265137,-11.699999809265137 -4.199999809265137,-11.699999809265137 C-4.199999809265137,-11.699999809265137 -9.199999809265137,-16.899999618530273 -9.199999809265137,-16.899999618530273 C-9.199999809265137,-16.899999618530273 -13.100000381469727,-16.299999237060547 -13.100000381469727,-16.299999237060547z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M2.700000047683716,-18.899999618530273 C2.700000047683716,-18.899999618530273 7.599999904632568,-13.699999809265137 7.599999904632568,-13.699999809265137 C7.599999904632568,-13.699999809265137 11.5,-14.300000190734863 11.5,-14.300000190734863 C11.5,-14.300000190734863 6.599999904632568,-19.600000381469727 6.599999904632568,-19.600000381469727 C6.599999904632568,-19.600000381469727 2.700000047683716,-18.899999618530273 2.700000047683716,-18.899999618530273z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M10.5,-20.200000762939453 C10.5,-20.200000762939453 15.5,-15 15.5,-15 C15.5,-15 19.399999618530273,-15.699999809265137 19.399999618530273,-15.699999809265137 C19.399999618530273,-15.699999809265137 14.5,-20.899999618530273 14.5,-20.899999618530273 C14.5,-20.899999618530273 10.5,-20.200000762939453 10.5,-20.200000762939453z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(159,168,218)" fill-opacity="1" d=" M-16.5,-14 C-17.327999114990234,-14 -18,-13.32800006866455 -18,-12.5 C-18,-11.67199993133545 -17.327999114990234,-11 -16.5,-11 C-15.67199993133545,-11 -15,-11.67199993133545 -15,-12.5 C-15,-13.32800006866455 -15.67199993133545,-14 -16.5,-14z"></path></g></g></g></svg>`
const code_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#__lottie_element_2)"><g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,24,21)"><path fill="rgb(83,109,121)" fill-opacity="1" d=" M-18,-13 C-18,-13 18,-13 18,-13 C18,-13 18,13 18,13 C18,13 -18,13 -18,13 C-18,13 -18,-13 -18,-13z"></path></g><g opacity="1" transform="matrix(1,0,0,1,24,20.5)"><path fill="rgb(186,222,250)" fill-opacity="1" d=" M-16,-10.5 C-16,-10.5 16,-10.5 16,-10.5 C16,-10.5 16,10.5 16,10.5 C16,10.5 -16,10.5 -16,10.5 C-16,10.5 -16,-10.5 -16,-10.5z"></path></g><g opacity="1" transform="matrix(1,0,0,1,24,37)"><path fill="rgb(69,90,99)" fill-opacity="1" d=" M-3,-3 C-3,-3 3,-3 3,-3 C3,-3 3,0 3,0 C3,0 -3,0 -3,0 C-3,0 -3,-3 -3,-3z M9,0 C9,0 -9,0 -9,0 C-11,0 -11,2 -11,2 C-11,2 -11,3 -11,3 C-11,3 11,3 11,3 C11,3 11,2 11,2 C11,2 11,0 9,0z"></path></g></g><g transform="matrix(0.8999999761581421,0,0,0.8999999761581421,2.2750015258789062,-1.0999984741210938)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,15.315999984741211,24.465999603271484)"><path fill="rgb(21,101,192)" fill-opacity="1" d=" M-0.8989999890327454,0.02500000037252903 C-0.8989999890327454,0.02500000037252903 3.684000015258789,2.0399999618530273 3.684000015258789,2.0399999618530273 C3.684000015258789,2.0399999618530273 3.684000015258789,4.894999980926514 3.684000015258789,4.894999980926514 C3.684000015258789,4.894999980926514 -3.684000015258789,1.2100000381469727 -3.684000015258789,1.2100000381469727 C-3.684000015258789,1.2100000381469727 -3.684000015258789,-1.1990000009536743 -3.684000015258789,-1.1990000009536743 C-3.684000015258789,-1.1990000009536743 3.684000015258789,-4.894999980926514 3.684000015258789,-4.894999980926514 C3.684000015258789,-4.894999980926514 3.684000015258789,-2.0399999618530273 3.684000015258789,-2.0399999618530273 C3.684000015258789,-2.0399999618530273 -0.8989999890327454,0.02500000037252903 -0.8989999890327454,0.02500000037252903z"></path></g><g opacity="1" transform="matrix(-1,0,0,-1,32.70000076293945,24.465999603271484)"><path fill="rgb(21,101,192)" fill-opacity="1" d=" M-0.8989999890327454,0.02500000037252903 C-0.8989999890327454,0.02500000037252903 3.684000015258789,2.0399999618530273 3.684000015258789,2.0399999618530273 C3.684000015258789,2.0399999618530273 3.684000015258789,4.894999980926514 3.684000015258789,4.894999980926514 C3.684000015258789,4.894999980926514 -3.684000015258789,1.2100000381469727 -3.684000015258789,1.2100000381469727 C-3.684000015258789,1.2100000381469727 -3.684000015258789,-1.1990000009536743 -3.684000015258789,-1.1990000009536743 C-3.684000015258789,-1.1990000009536743 3.684000015258789,-4.894999980926514 3.684000015258789,-4.894999980926514 C3.684000015258789,-4.894999980926514 3.684000015258789,-2.0399999618530273 3.684000015258789,-2.0399999618530273 C3.684000015258789,-2.0399999618530273 -0.8989999890327454,0.02500000037252903 -0.8989999890327454,0.02500000037252903z"></path></g><g opacity="1" transform="matrix(1,0,0,1,24.240999221801758,24)"><path fill="rgb(21,101,192)" fill-opacity="1" d=" M-1.1649999618530273,7.986000061035156 C-1.1649999618530273,7.986000061035156 -3.259000062942505,7.986000061035156 -3.259000062942505,7.986000061035156 C-3.259000062942505,7.986000061035156 1.1619999408721924,-7.916999816894531 1.1619999408721924,-7.916999816894531 C1.1619999408721924,-7.916999816894531 3.259000062942505,-7.916999816894531 3.259000062942505,-7.916999816894531 C3.259000062942505,-7.916999816894531 -1.1649999618530273,7.986000061035156 -1.1649999618530273,7.986000061035156z"></path></g></g></g></svg>`
const zip_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><g transform="translate(0 -1020.362)"><path fill="#e9eded" fill-rule="evenodd" stroke="#4bbfeb" stroke-linecap="round" stroke-linejoin="round" d="m 26.49822,1027.8658 0,21.5 c 0,0.831 -0.66899,1.5 -1.49998,1.5 l -18.00004,0 c -0.83099,0 -1.49998,-0.669 -1.49998,-1.5 l 0,-26 c 0,-0.831 0.66899,-1.5 1.49998,-1.5 l 13.50002,0 z"/><path fill="#4bbfeb" d="m 4.99822,1044.3658 0,2 0,2 0,1 c 0,1.108 0.89198,2 2,2 l 18,0 c 1.10802,0 2,-0.892 2,-2 l 0,-1 0,-2 0,-2 -2,0 -18,0 -2,0 z"/><path fill="#4bbfeb" stroke="#4bbfeb" stroke-linecap="round" stroke-linejoin="round" d="m 26.49466,1027.8658 -4.49997,0 c -0.83099,0 -1.49998,-0.6691 -1.49998,-1.5 l 0,-4.5"/><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" fill="#4bbfeb" fill-rule="evenodd" d="M 15.498047 7 L 15.498047 8 L 14.498047 8 L 14.498047 9 L 15.498047 9 L 15.498047 10 L 14.498047 10 L 14.498047 11 L 15.498047 11 L 15.498047 12 L 14.498047 12 L 14.498047 13 L 15.498047 13 L 15.498047 14 L 14.498047 14 L 14.498047 15 L 15.498047 15 L 15.498047 16 L 14.498047 16 L 14.498047 17 L 15.498047 17 L 15.498047 18 L 14.998047 18 A 0.50004997 0.50004997 0 0 0 14.498047 18.5 L 14.498047 19.464844 A 0.50004997 0.50004997 0 0 0 14.498047 19.5 L 14.498047 20 L 14.498047 20.5 C 14.498047 21.3224 15.175696 22 15.998047 22 C 16.820398 22 17.498047 21.3224 17.498047 20.5 L 17.498047 20.033203 A 0.50004997 0.50004997 0 0 0 17.498047 20 L 17.498047 19.5 L 17.498047 18.5 A 0.50004997 0.50004997 0 0 0 16.998047 18 L 16.498047 18 L 16.498047 17 L 17.498047 17 L 17.498047 16 L 16.498047 16 L 16.498047 15 L 17.498047 15 L 17.498047 14 L 16.498047 14 L 16.498047 13 L 17.498047 13 L 17.498047 12 L 16.498047 12 L 16.498047 11 L 17.498047 11 L 17.498047 10 L 16.498047 10 L 16.498047 9 L 17.498047 9 L 17.498047 8 L 16.498047 8 L 16.498047 7 L 15.498047 7 z M 15.498047 19 L 16.498047 19 L 16.498047 19.5 L 16.498047 20.5 C 16.498047 20.7857 16.283696 21 15.998047 21 C 15.712398 21 15.498047 20.7857 15.498047 20.5 L 15.498047 20.033203 A 0.50004997 0.50004997 0 0 0 15.498047 20 L 15.498047 19.5 L 15.498047 19 z " color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="translate(0 1020.362)"/><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" fill="#e9eded" fill-rule="evenodd" d="M 13.490234 24.990234 A 0.50005 0.50005 0 0 0 12.998047 25.496094 L 12.998047 29.498047 A 0.50005 0.50005 0 1 0 13.998047 29.498047 L 13.998047 25.496094 A 0.50005 0.50005 0 0 0 13.490234 24.990234 z M 11.511719 24.998047 A 0.50005 0.50005 0 0 0 11.460938 25 L 8.5058594 25 A 0.50005 0.50005 0 1 0 8.5058594 26 L 10.498047 26 L 8.1347656 29.154297 A 0.50005 0.50005 0 0 0 8.4375 29.992188 A 0.50019268 0.50019268 0 0 0 8.4472656 29.994141 A 0.50005 0.50005 0 0 0 8.5058594 29.998047 L 11.494141 29.998047 A 0.50005 0.50005 0 1 0 11.494141 28.998047 L 9.5019531 28.998047 L 11.865234 25.841797 A 0.50005 0.50005 0 0 0 11.75 25.066406 A 0.50005 0.50005 0 0 0 11.720703 25.050781 A 0.50005 0.50005 0 0 0 11.705078 25.042969 A 0.50005 0.50005 0 0 0 11.675781 25.03125 A 0.50005 0.50005 0 0 0 11.658203 25.025391 A 0.50005 0.50005 0 0 0 11.511719 24.998047 z M 16.498047 25.003906 C 15.723646 25.003906 15.086569 25.606569 15.013672 26.363281 C 15.013355 26.366575 15.012014 26.369747 15.011719 26.373047 A 0.50005 0.50005 0 0 0 14.998047 26.498047 C 14.998039 26.500027 14.998047 26.501925 14.998047 26.503906 L 14.998047 29.498047 A 0.50005 0.50005 0 1 0 15.998047 29.498047 L 15.998047 27.910156 C 16.155295 27.966775 16.322382 28.003906 16.498047 28.003906 C 17.320552 28.003906 17.998047 27.326406 17.998047 26.503906 C 17.998047 25.681406 17.320552 25.003906 16.498047 25.003906 z M 16.498047 26.003906 C 16.780112 26.003906 16.998047 26.221906 16.998047 26.503906 C 16.998047 26.786006 16.780112 27.003906 16.498047 27.003906 C 16.215982 27.003906 15.998047 26.786006 15.998047 26.503906 L 15.998047 26.498047 C 16.001131 26.218978 16.217997 26.003906 16.498047 26.003906 z " color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="translate(0 1020.362)"/></g></svg>`
const image_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#__lottie_element_19)"><g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(245,124,0)" fill-opacity="1" d=" M16,17 C16,17 -16,17 -16,17 C-18.200000762939453,17 -20,15.199999809265137 -20,13 C-20,13 -20,-13 -20,-13 C-20,-15.199999809265137 -18.200000762939453,-17 -16,-17 C-16,-17 16,-17 16,-17 C18.200000762939453,-17 20,-15.199999809265137 20,-13 C20,-13 20,13 20,13 C20,15.199999809265137 18.200000762939453,17 16,17z"></path></g></g><g transform="matrix(1,0,0,1,35,16)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,249,196)" fill-opacity="1" d=" M0,-3 C-1.656999945640564,-3 -3,-1.656999945640564 -3,0 C-3,1.656999945640564 -1.656999945640564,3 0,3 C1.656999945640564,3 3,1.656999945640564 3,0 C3,-1.656999945640564 1.656999945640564,-3 0,-3z"></path></g></g><g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,20,24)"><path fill="rgb(148,42,9)" fill-opacity="1" d=" M0,-8 C0,-8 -11,8 -11,8 C-11,8 11,8 11,8 C11,8 0,-8 0,-8z"></path></g><g opacity="1" transform="matrix(1,0,0,1,31,27)"><path fill="rgb(191,54,12)" fill-opacity="1" d=" M0,-5 C0,-5 -8,5 -8,5 C-8,5 8,5 8,5 C8,5 0,-5 0,-5z"></path></g></g></g></svg>`
const audio_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#__lottie_element_30)"><g mask="url(#__lottie_element_41)" transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,26,24)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(129,211,249)" stroke-opacity="1" stroke-width="2" d=" M-16,0 C-16,-8.836000442504883 -8.836000442504883,-16 0,-16 C0.6779999732971191,-16 1.3450000286102295,-15.958000183105469 2,-15.87600040435791 C9.892999649047852,-14.892000198364258 16,-8.159000396728516 16,0 C16,8.159000396728516 9.892999649047852,14.892000198364258 2,15.87600040435791 C1.3450000286102295,15.958000183105469 0.6779999732971191,16 0,16 C-8.836000442504883,16 -16,8.836999893188477 -16,0z"></path></g></g><g mask="url(#__lottie_element_38)" style="display: none;" transform="matrix(1,0,0,1,0,0)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,26,24)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(129,211,249)" stroke-opacity="1" stroke-width="2" d=" M-16,0 C-16,-8.836000442504883 -8.836000442504883,-16 0,-16 C0.6779999732971191,-16 1.3450000286102295,-15.958000183105469 2,-15.87600040435791 C9.892999649047852,-14.892000198364258 16,-8.159000396728516 16,0 C16,8.159000396728516 9.892999649047852,14.892000198364258 2,15.87600040435791 C1.3450000286102295,15.958000183105469 0.6779999732971191,16 0,16 C-8.836000442504883,16 -16,8.836999893188477 -16,0z"></path></g></g><g mask="url(#__lottie_element_35)" transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,26,24)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(79,195,247)" stroke-opacity="1" stroke-width="2" d=" M-11,0 C-11,-6.074999809265137 -6.074999809265137,-11 0,-11 C0.6830000281333923,-11 1.3519999980926514,-10.937999725341797 2,-10.819000244140625 C7.119999885559082,-9.878000259399414 11,-5.392000198364258 11,0 C11,5.39300012588501 7.119999885559082,9.878000259399414 2,10.817999839782715 C1.3519999980926514,10.937999725341797 0.6830000281333923,11 0,11 C-6.074999809265137,11 -11,6.074999809265137 -11,0z"></path></g><g opacity="1" transform="matrix(1,0,0,1,26,24)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(3,169,244)" stroke-opacity="1" stroke-width="2" d=" M-6,0 C-6,-3.312999963760376 -3.312999963760376,-6 0,-6 C0.7009999752044678,-6 1.375,-5.880000114440918 2,-5.658999919891357 C4.329999923706055,-4.835000038146973 6,-2.611999988555908 6,0 C6,2.611999988555908 4.329999923706055,4.835000038146973 2,5.6579999923706055 C1.375,5.880000114440918 0.7009999752044678,6 0,6 C-3.312999963760376,6 -6,3.312999963760376 -6,0z"></path></g></g><g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,9.5,24)"><path fill="rgb(83,109,121)" fill-opacity="1" d=" M4.5,8 C4.5,8 -2.5,8 -2.5,8 C-3.6050000190734863,8 -4.5,7.105000019073486 -4.5,6 C-4.5,6 -4.5,-6 -4.5,-6 C-4.5,-7.105000019073486 -3.6050000190734863,-8 -2.5,-8 C-2.5,-8 4.5,-8 4.5,-8 C4.5,-8 4.5,8 4.5,8z"></path></g><g opacity="1" transform="matrix(1,0,0,1,20,24)"><path fill="rgb(120,144,156)" fill-opacity="1" d=" M6,18 C6,18 -6,8 -6,8 C-6,8 -6,-8 -6,-8 C-6,-8 6,-18 6,-18 C6,-18 6,18 6,18z"></path></g></g></g></svg>`
const markdown_icon = `<svg width="1.5em" height="1.5em" viewBox="0 0 1024 1024"><path d="M265.61429932 63.6656706h493.57455644c111.51629209 0 201.91670068 90.40220771 201.91670068 201.91580157v493.57545556c0 111.51449297-90.40040859 201.91670068-201.91670068 201.91670069H265.61429932c-111.51539297 0-201.91580068-90.40220771-201.91580069-201.91670069V265.58147217c0-111.51359385 90.40040859-201.91580068 201.91580069-201.91580157z" fill="#707070"></path><path d="M763.60576133 722.16141084L670.49099316 599.42972305h48.19382491V302.57788818h89.84188652v296.85183487h48.19382491L763.60576133 722.16141084zM519.02738545 472.82885791c0-13.71570117 0.30399346-28.21926709 0.91827773-43.48821445l-13.67612753 19.09855107c-0.1726831 0.54323174-0.34626533 1.10265205-0.52074757 1.62609698l-7.15195107 10.50577734-109.52234384 166.63092451-40.52562364-62.91054668h-0.25092949l-28.34248359-44.38850449-41.19926749-63.95563828h0.36425304l-8.60086846-13.47016729-0.46318536-1.8752291-14.42082305-21.30475518c1.05318633 33.22347451 1.60451191 57.42426622 1.60451192 72.50254365v229.53787296h-89.15835059V303.99532753h140.37862325l77.89348828 115.26944679h1.3346956l80.12037832-115.26944678H610.08255019v417.34224141H519.02828457V472.82885791z" fill="#ffffff"></path></svg>`
const pdf_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#__lottie_element_44)"><g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,24,24)"><path fill="rgb(255,87,34)" fill-opacity="1" d=" M16,21 C16,21 -16,21 -16,21 C-16,21 -16,-21 -16,-21 C-16,-21 6,-21 6,-21 C6,-21 16,-11 16,-11 C16,-11 16,21 16,21z"></path></g><g opacity="1" transform="matrix(1,0,0,1,33.75,9.25)"><path fill="rgb(251,233,231)" fill-opacity="1" d=" M4.75,4.75 C4.75,4.75 -4.75,4.75 -4.75,4.75 C-4.75,4.75 -4.75,-4.75 -4.75,-4.75 C-4.75,-4.75 4.75,4.75 4.75,4.75z"></path></g></g><g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-8,15 C-8.399999618530273,15 -8.699999809265137,14.899999618530273 -9,14.800000190734863 C-10.100000381469727,14.199999809265137 -10.199999809265137,13.300000190734863 -10,12.600000381469727 C-9.600000381469727,11.399999618530273 -7.400000095367432,9.899999618530273 -4.5,8.600000381469727 C-4.5,8.600000381469727 -4.5,8.600000381469727 -4.5,8.600000381469727 C-3.200000047683716,6.199999809265137 -2.200000047683716,3.700000047683716 -1.600000023841858,1.600000023841858 C-2.5999999046325684,-0.30000001192092896 -3.0999999046325684,-2.0999999046325684 -3.0999999046325684,-3.4000000953674316 C-3.0999999046325684,-4.099999904632568 -2.9000000953674316,-4.699999809265137 -2.5999999046325684,-5.199999809265137 C-2.200000047683716,-5.699999809265137 -1.600000023841858,-6 -0.800000011920929,-6 C0.10000000149011612,-6 0.800000011920929,-5.5 1.100000023841858,-4.599999904632568 C1.600000023841858,-3.4000000953674316 1.2999999523162842,-1.2000000476837158 0.6000000238418579,1.2999999523162842 C1.600000023841858,3 2.799999952316284,4.599999904632568 4.099999904632568,5.800000190734863 C6,5.400000095367432 7.699999809265137,5.199999809265137 8.800000190734863,5.400000095367432 C10.699999809265137,5.699999809265137 11,7 11,7.5 C11,9.600000381469727 8.800000190734863,9.600000381469727 8,9.600000381469727 C6.5,9.600000381469727 5,9 3.700000047683716,7.900000095367432 C3.700000047683716,7.900000095367432 3.700000047683716,7.900000095367432 3.700000047683716,7.900000095367432 C1.2999999523162842,8.5 -1.100000023841858,9.300000190734863 -3,10.199999809265137 C-4,11.899999618530273 -5,13.300000190734863 -5.900000095367432,14.100000381469727 C-6.800000190734863,14.800000190734863 -7.5,15 -8,15z M-6.800000190734863,12.100000381469727 C-7.300000190734863,12.399999618530273 -7.699999809265137,12.699999809265137 -7.900000095367432,13 C-7.699999809265137,12.899999618530273 -7.300000190734863,12.699999809265137 -6.800000190734863,12.100000381469727z M6.800000190734863,7.400000095367432 C7.199999809265137,7.5 7.599999904632568,7.599999904632568 8,7.599999904632568 C8.600000381469727,7.599999904632568 8.899999618530273,7.5 9,7.5 C9,7.5 9,7.5 9,7.5 C8.899999618530273,7.400000095367432 8.199999809265137,7.199999809265137 6.800000190734863,7.400000095367432z M-0.20000000298023224,3.799999952316284 C-0.6000000238418579,5 -1.2000000476837158,6.300000190734863 -1.7000000476837158,7.5 C-0.5,7.099999904632568 0.699999988079071,6.699999809265137 1.899999976158142,6.400000095367432 C1.100000023841858,5.599999904632568 0.4000000059604645,4.699999809265137 -0.20000000298023224,3.799999952316284z M-0.800000011920929,-4 C-0.8999999761581421,-4 -0.8999999761581421,-4 -0.8999999761581421,-4 C-1,-3.9000000953674316 -1.100000023841858,-3.200000047683716 -0.699999988079071,-1.7000000476837158 C-0.6000000238418579,-2.9000000953674316 -0.6000000238418579,-3.799999952316284 -0.800000011920929,-4z"></path></g></g></g></svg>`
const file_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#__lottie_element_63)"><g transform="matrix(1,0,0,1,7.75,2.75)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,16.25,21.25)"><path fill="rgb(144,201,248)" fill-opacity="1" d=" M16,21 C16,21 -16,21 -16,21 C-16,21 -16,-21 -16,-21 C-16,-21 6,-21 6,-21 C6,-21 16,-11 16,-11 C16,-11 16,21 16,21z"></path></g></g><g transform="matrix(1,0,0,1,15,21)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(24,118,210)" stroke-opacity="1" stroke-width="2" d=" M1,1 C1,1 18,1 18,1"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(24,118,210)" stroke-opacity="1" stroke-width="2" d=" M1,5 C1,5 14,5 14,5"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(24,118,210)" stroke-opacity="1" stroke-width="2" d=" M1,9 C1,9 18,9 18,9"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="10" stroke="rgb(24,118,210)" stroke-opacity="1" stroke-width="2" d=" M1,13 C1,13 14,13 14,13"></path></g></g><g transform="matrix(1,0,0,1,28.75,4.25)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,5,5)"><path fill="rgb(224,245,253)" fill-opacity="1" d=" M4.75,4.75 C4.75,4.75 -4.75,4.75 -4.75,4.75 C-4.75,4.75 -4.75,-4.75 -4.75,-4.75 C-4.75,-4.75 0,0 0,0 C0,0 4.75,4.75 4.75,4.75z"></path></g></g></g></svg>`
const Os = {
    isWindows: navigator.userAgent.toUpperCase().indexOf('WIN') > -1,
    isMac: navigator.userAgent.toUpperCase().indexOf('MAC') > -1,
    isMacLike: /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent),
    isIos: /(iPhone|iPod|iPad)/i.test(navigator.userAgent),
    isMobile: /Android|webOS|iPhone|iPad|iPod|iOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};
// Utility functions
function getDocumentHeight() {
    const doc = document;
    return Math.max(
        doc.body.scrollHeight, doc.documentElement.scrollHeight,
        doc.body.offsetHeight, doc.documentElement.offsetHeight,
        doc.body.clientHeight, doc.documentElement.clientHeight
    );
}

function getFileIcon(extension) {
    const iconMap = {
        video: video_icon,
        code: code_icon,
        zip: zip_icon,
        image: image_icon,
        audio: audio_icon,
        markdown: markdown_icon,
        pdf: pdf_icon,
        default: file_icon
    };

    for (const [type, extensions] of Object.entries(FILE_TYPES)) {
        if (extensions.includes(extension)) {
            return iconMap[type] || iconMap.default;
        }
    }
    return iconMap.default;
}

function buildNavigationPath() {
    const navFullLink = window.location.pathname;
    const navArray = navFullLink.trim('/').split('/');
    let currentPath = '/';
    let containerContent = '';

    if (navArray.length > 0) {
        for (const pathPart of navArray) {
            const decodedPathPart = decodeURIComponent(pathPart).replace(/\//g, '%2F');
            const trimmedPathPart = decodedPathPart.replace(/\?.+/g, "$'");
            const displayedPathPart = trimmedPathPart.length > 15 
                ? trimmedPathPart.slice(0, 5) + '...' 
                : trimmedPathPart.slice(0, 15);
            
            currentPath += pathPart + '/';
            
            if (displayedPathPart === '') break;
            
            containerContent += `<li class="breadcrumb-item"><a href="${currentPath}">${displayedPathPart}</a></li>`;
        }
    }
    return containerContent;
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    
    for (const varPair of vars) {
        const pair = varPair.split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}
function render(path) {
    if (path.indexOf("?") > 0) {
        path = path.substr(0, path.indexOf("?"));
    }
    
    // Extract drive order from path if available
    const driveMatch = path.match(/^\/(\d+):/);
    if (driveMatch) {
        window.current_drive_order = parseInt(driveMatch[1]);
    }
    
    // Check if this is a search page and set up MODEL accordingly
    if (path.includes(":search")) {
        window.MODEL.is_search_page = true;
        // Extract search query from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        window.MODEL.q = urlParams.get('q') || '';
    } else {
        window.MODEL.is_search_page = false;
        window.MODEL.q = '';
    }
    
    title(path);
    nav(path);
    var reg = /\/\d+:$/g;
    if (path.includes("/fallback")) {
        window.scroll_status = {
            event_bound: false,
            loading_lock: false
        };
        const can_preview = getQueryVariable('a');
        const id = getQueryVariable('id');
        if (can_preview) {
            return fallback(id, true)
        } else {
            return list(null, id, true);
        }
    } else if (window.MODEL.is_search_page) {
        window.scroll_status = {
            event_bound: false,
            loading_lock: false
        };
        render_search_result_list()
    } else if (path.match(reg) || path.slice(-1) == '/') {
        window.scroll_status = {
            event_bound: false,
            loading_lock: false
        };
        list(path);
    } else {
        file(path);
    }
}
function title(path) {
    path = decodeURI(path);
    var cur = window.current_drive_order || 0;
    var drive_name = window.drive_names[cur];
    path = path.replace(`/${cur}:`, '');
    var model = window.MODEL;
    if (model.is_search_page)
        $('title').html(`${drive_name} - Search results for ${model.q} `);
    else
        $('title').html(`${drive_name} - ${path}`);
}
function nav() {
    const model = window.MODEL;
    const currentDrive = window.current_drive_order || 0;
    const searchText = model.is_search_page ? (model.q || '') : '';
    
    const navbarHTML = createNavbarHTML(currentDrive, searchText);
    $('#nav').html(navbarHTML);
}

function createNavbarHTML(currentDrive, searchText) {
    const navbarStart = `
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">SPRiNGLER</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarColor01" aria-controls="navbarColor01" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="https://telegra.ph/SUPPORT-US-02-19" target="_blank">Support</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/logout">Logout</a>
                        </li>
                    </ul>`;

    const searchBar = createSearchBar(currentDrive, searchText);
    
    return window.MODEL.root_type < 2 
        ? navbarStart + searchBar 
        : navbarStart + '</div></div></nav>';
}

function createSearchBar(currentDrive, searchText) {
    return `
        <form class="d-flex" method="get" action="/${currentDrive}:search" id="search_bar_form">
            <input class="form-control me-sm-2" name="q" type="search" 
                   placeholder="Search" value="${searchText}" required>
            <button class="btn btn-secondary" type="submit">Search</button>
        </form>
        </div>
        </div>
        </nav>`;
}
async function requestListPath(path, params, resultCallback, authErrorCallback, retries = CONSTANTS.MAX_RETRY_COUNT, fallback = false) {
    const requestData = {
        id: params.id || '',
        type: 'folder',
        password: params.password || '',
        page_token: params.page_token || '',
        page_index: params.page_index || 0
    };

    showUpdateMessage('Connecting...');
    
    if (fallback) {
        path = "/0:fallback";
    }

    try {
        await performListRequest(path, requestData, resultCallback, retries);
    } catch (error) {
        handleRequestError(error, retries);
    }
}

async function performListRequest(path, requestData, resultCallback, retries) {
    const response = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }

    const res = await response.json();
    
    if (res?.error?.code === 401) {
        askPassword(path);
    } else if (res?.data === null) {
        showErrorMessage('Server didn\'t send any data.');
    } else if (res?.data) {
        resultCallback(res, path, requestData);
        hideUpdateMessage();
    }
}

function showUpdateMessage(message) {
    $('#update').show().html(`<div class='alert alert-info' role='alert'>${message}</div>`);
}

function showErrorMessage(message) {
    $('#update').hide();
    $('#list').html(`<div class='alert alert-danger' role='alert'>${message}</div>`);
    $('#spinner').remove();
}

function hideUpdateMessage() {
    $('#update').hide();
}

async function handleRequestError(error, retries) {
    if (retries > 0) {
        await sleep(CONSTANTS.RETRY_DELAY);
        showUpdateMessage('Retrying...');
        // Retry logic would be implemented here
    } else {
        showErrorMessage(`Unable to get data from the server. ${error}`);
    }
}
function requestSearch(params, resultCallback, retries = 3) {
    console.log('requestSearch called with:', params);
    console.log('current_drive_order:', window.current_drive_order);
    
    var p = {
        q: params['q'] || null,
        page_token: params['page_token'] || null,
        page_index: params['page_index'] || 0
    };
    
    function performRequest(retries) {
        const searchUrl = `/${window.current_drive_order}:search`;
        console.log('Making search request to:', searchUrl);
        
        fetch(searchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        })
            .then(function (response) {
                console.log('Search response status:', response.status);
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(function (res) {
                console.log('Search response data:', res);
                if (res && res.data === null) {
                    $('#spinner').remove();
                    $('#list').html(`<div class='alert alert-danger' role='alert'> Server didn't send any data.</div>`);
                    $('#update').remove();
                }
                if (res && res.data) {
                    if (resultCallback) resultCallback(res, p);
                    $('#update').remove();
                }
            })
            .catch(function (error) {
                console.error('Search request failed:', error);
                if (retries > 0) {
                    sleep(2000);
                    $('#update').html(`<div class='alert alert-info' role='alert'> Retrying...</div>`);
                    performRequest(retries - 1);
                } else {
                    $('#update').html(`<div class='alert alert-danger' role='alert'> Search failed. Make sure the search endpoint is available.</div>`);
                    $('#list').html(`<div class='alert alert-warning' role='alert'>Unable to perform search. This might be because:<br>
                        1. The search feature is not enabled on the server<br>
                        2. There's a network connectivity issue<br>
                        3. The server is temporarily unavailable</div>`);
                    $('#spinner').remove();
                }
            });
    }
    $('#update').html(`<div class='alert alert-info' role='alert'> Connecting...</div>`);
    performRequest(retries);
}
function list(path, id = '', fallback = false) {
    console.log(id);
    var containerContent = `
        <div class="container">
            <div id="update"></div>
            <div class="alert alert-primary d-flex align-items-center" role="alert" style="margin-bottom: 0; padding-bottom: 0rem;">
                <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>`;
    var navfulllink = window.location.pathname;
    var navarray = navfulllink.trim('/').split('/');
    var currentPath = '/';
    if (navarray.length > 0) {
        for (var i in navarray) {
            var pathPart = navarray[i];
            var decodedPathPart = decodeURIComponent(pathPart).replace(/\//g, '%2F');
            var trimmedPathPart = decodedPathPart.replace(/\?.+/g, "$'");
            var displayedPathPart = trimmedPathPart.length > 15 ? trimmedPathPart.slice(0, 5) + '...' : trimmedPathPart.slice(0, 15);
            currentPath += pathPart + '/';
            if (displayedPathPart === '') {
                break;
            }
            containerContent += `<li class="breadcrumb-item"><a href="${currentPath}">${displayedPathPart}</a></li>`;
        }
    }
    containerContent += `
                    </ol>
                </nav>
            </div>
            <div id="list" class="list-group text-break"></div>
            <div class="alert alert-secondary text-center d-none" role="alert" id="count"><span class="number text-center"></span> | <span class="totalsize text-center"></span></div>
        </div>`;
    $('#content').html(containerContent);
    var password = localStorage.getItem('password' + path);
    $('#list').html(`<div class="d-flex justify-content-center"><div class="spinner-border text-light m-5" role="status" id="spinner"><span class="visually-hidden"></span></div></div>`);
    function handleSuccessResult(res, path, prevReqParams) {
        console.log(res, path, prevReqParams);
        $('#list')
            .data('nextPageToken', res['nextPageToken'])
            .data('curPageIndex', res['curPageIndex']);
        $('#spinner').remove();
        if (res['nextPageToken'] === null) {
            $(window).off('scroll');
            window.scroll_status.event_bound = false;
            window.scroll_status.loading_lock = false;
            if (fallback) {
                append_files_to_fallback_list(path, res['data']['files']);
            } else {
                append_files_to_list(path, res['data']['files']);
            }
        } else {
            console.log('doing something...')
            if (fallback) {
                append_files_to_fallback_list(path, res['data']['files']);
            } else {
                append_files_to_list(path, res['data']['files']);
            }
            if (window.scroll_status.event_bound !== true) {
                $(window).on('scroll', function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = getDocumentHeight();
                    var windowHeight = $(this).height();
                    if (scrollTop + windowHeight > scrollHeight - (Os.isMobile ? 130 : 80)) {
                        if (window.scroll_status.loading_lock === true) {
                            return;
                        }
                        window.scroll_status.loading_lock = true;
                        $(`<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border text-light m-5" role="status" id="spinner"><span class="visually-hidden"></span></div></div>`)
                        let $list = $('#list');
                        if (fallback) {
                            console.log('fallback inside handleSuccessResult');
                            requestListPath(path, {
                                id: id,
                                password: prevReqParams['password'],
                                page_token: $list.data('nextPageToken'),
                                page_index: $list.data('curPageIndex') + 1
                            },
                                handleSuccessResult,
                                null, 5, id, fallback = true);
                        } else {
                            requestListPath(path, {
                                password: prevReqParams['password'],
                                page_token: $list.data('nextPageToken'),
                                page_index: $list.data('curPageIndex') + 1
                            },
                                handleSuccessResult,
                                null);
                        }
                    }
                });
                window.scroll_status.event_bound = true;
            }
        }
        if (window.scroll_status.loading_lock === true) {
            window.scroll_status.loading_lock = false;
        }
    }
    if (fallback) {
        console.log('fallback inside list');
        requestListPath(path, {
            id: id,
            password: password
        },
            handleSuccessResult,
            null, null, fallback = true);
    } else {
        console.log("handling this")
        requestListPath(path, {
            password: password
        },
            handleSuccessResult,
            null);
    }
}
function askPassword(path) {
    $('#spinner').remove();
    var passwordInput = prompt("Directory encryption, please enter the password", "");
    localStorage.setItem('password' + path, passwordInput);
    if (passwordInput != null && passwordInput != "") {
        list(path);
    } else {
        history.go(-1);
    }
}
function append_files_to_fallback_list(path, files) {
    try {
        const $list = $('#list');
        const isLastPageLoaded = $list.data('nextPageToken') === null;
        const isFirstPage = $list.data('curPageIndex') === '0';
        
        let html = '';
        let targetFiles = [];
        let totalSize = 0;

        files.forEach(item => {
            html += createFileListItem(item, path, false, true);
            
            if (item.mimeType !== 'application/vnd.google-apps.folder') {
                totalSize += Number(item.size);
            }
        });

        updateFilesList($list, html, isFirstPage);
        updateTargetFiles(path, targetFiles, isFirstPage);
        
        if (isLastPageLoaded) {
            updateFileCounts($list, totalSize);
        }
    } catch (error) {
        console.error('Error in append_files_to_fallback_list:', error);
    }
}

function append_files_to_list(path, files) {
    const $list = $('#list');
    const isLastPageLoaded = $list.data('nextPageToken') === null;
    const isFirstPage = $list.data('curPageIndex') === '0';
    
    let html = '';
    let targetFiles = [];
    let totalSize = 0;

    files.forEach(item => {
        html += createFileListItem(item, path, false, false);
        
        if (item.mimeType !== 'application/vnd.google-apps.folder') {
            totalSize += Number(item.size);
        }
    });

    updateFilesList($list, html, isFirstPage);
    updateTargetFiles(path, targetFiles, isFirstPage);
    
    if (isLastPageLoaded) {
        updateFileCounts($list, totalSize);
    }
}

function updateFilesList($list, html, isFirstPage) {
    const currentContent = isFirstPage ? '' : $list.html();
    $list.html(currentContent + html);
}

function updateTargetFiles(path, targetFiles, isFirstPage) {
    if (targetFiles.length === 0) return;
    
    const oldData = localStorage.getItem(path);
    let newChildren = targetFiles;
    
    if (!isFirstPage && oldData) {
        try {
            const oldChildren = JSON.parse(oldData);
            newChildren = Array.isArray(oldChildren) ? oldChildren.concat(targetFiles) : targetFiles;
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }
    
    localStorage.setItem(path, JSON.stringify(newChildren));
}

function updateFileCounts($list, totalSize) {
    const totalSizeFormatted = formatFileSize(totalSize) || '0 Bytes';
    const totalItems = $list.find('.countitems').length;
    const totalFiles = $list.find('.size_items').length;
    
    const countElement = $('#count');
    countElement.removeClass('d-none');
    
    // Update item count
    if (totalItems === 0) {
        countElement.find('.number').text("Empty Folder");
    } else {
        const itemText = totalItems === 1 ? "item" : "items";
        countElement.find('.number').text(`${totalItems} ${itemText}`);
    }
    
    // Update file size
    if (totalFiles === 0) {
        countElement.find('.totalsize').text("Zero Files");
    } else {
        const fileText = totalFiles === 1 ? "File" : "Files";
        countElement.find('.totalsize').text(`${totalFiles} ${fileText} with Size ${totalSizeFormatted}`);
    }
}
function append_files_to_list(path, files) {
    var $list = $('#list');
    var is_lastpage_loaded = null === $list.data('nextPageToken');
    var is_firstpage = '0' == $list.data('curPageIndex');
    html = "";
    let targetFiles = [];
    var totalsize = 0;
    for (i in files) {
        var item = files[i];
        var ep = encodeURIComponent(item.name).replace(/\//g, '%2F') + '/';
        var p = path + ep.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F');
        item['modifiedTime'] = utc2jakarta(item['modifiedTime']);
        if (item['mimeType'] == 'application/vnd.google-apps.folder') {
            html += `<a href="${p}" style="color: white;" class="countitems list-group-item list-group-item-action"> ${folder_icon} ${item.name} <span class="badge bg-info float-end"> ` + item['modifiedTime'] + ` </span></a>`;
        } else {
            var totalsize = totalsize + Number(item.size);
            item['size'] = formatFileSize(item['size']);
            var link = window.location.origin + item.link;
            var c = "file";
            var ext = item.fileExtension
            console.log(ext)
            c += " view";
            html += `<div class="list-group-item list-group-item-action">`
function createFileListItem(item, path, isSearch = false, isFallback = false) {
    const modifiedTime = utc2jakarta(item.modifiedTime);
    
    if (item.mimeType === 'application/vnd.google-apps.folder') {
        return createFolderListItem(item, path, modifiedTime, isSearch);
    } else {
        return createFileItem(item, path, modifiedTime, isSearch, isFallback);
    }
}

function createFolderListItem(item, path, modifiedTime, isSearch) {
    if (isSearch) {
        return `<a style="cursor: pointer; color: white;" onclick="onSearchResultItemClick('${item.id}', false)" 
                data-bs-toggle="modal" data-bs-target="#SearchModel" class="countitems list-group-item list-group-item-action">
                ${folder_icon} ${item.name} 
                <span class="badge bg-info float-end">${modifiedTime}</span></a>`;
    } else {
        const linkPath = path.includes('fallback') 
            ? `/fallback?id=${item.id}`
            : path + encodeURIComponent(item.name).replace(/\//g, '%2F') + '/';
        
        return `<a href="${linkPath}" style="color: white;" class="countitems list-group-item list-group-item-action">
                ${folder_icon} ${item.name} 
                <span class="badge bg-info float-end">${modifiedTime}</span></a>`;
    }
}

function createFileItem(item, path, modifiedTime, isSearch, isFallback) {
    const fileIcon = getFileIcon(item.fileExtension);
    const fileSize = formatFileSize(item.size);
    const downloadLink = window.location.origin + item.link;
    
    const downloadButton = `<a href="${downloadLink}">
        <svg class="float-end" width="25px" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" 
             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
        </svg></a>`;

    return `<div class="list-group-item list-group-item-action" style="color: white;">
            ${fileIcon} 
            <a class="countitems size_items list-group-item-action" style="text-decoration: none; color: white;">
                <p>${item.name}</p>
            </a>
            ${downloadButton}
            <span class="badge bg-primary float-end">${fileSize}</span>
            <span class="badge bg-info float-end">${modifiedTime}</span>
        </div>`;
}
            html += ` <a class="countitems size_items list-group-item-action" style="text-decoration: none; color: white;" <p>${item.name}</p><a href="${link}"><svg class="float-end"width="25px" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path> <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path> </svg></a><span class="badge bg-primary float-end"> ` + item['size'] + ` </span><span class="badge bg-info float-end"> ` + item['modifiedTime'] + ` </span></div>`;
        }
    }
    if (targetFiles.length > 0) {
        let old = localStorage.getItem(path);
        let new_children = targetFiles;
        if (!is_firstpage && old) {
            let old_children;
            try {
                old_children = JSON.parse(old);
                if (!Array.isArray(old_children)) {
                    old_children = []
                }
            } catch (e) {
                old_children = [];
            }
            new_children = old_children.concat(targetFiles)
        }
        localStorage.setItem(path, JSON.stringify(new_children))
    }
    $list.html(($list.data('curPageIndex') == '0' ? '' : $list.html()) + html);
    if (is_lastpage_loaded) {
        total_size = formatFileSize(totalsize) || '0 Bytes';
        total_items = $list.find('.countitems').length;
        total_files = $list.find('.size_items').length;
        if (total_items == 0) {
            $('#count').removeClass('d-none').find('.number').text("Empty Folder");
        } else if (total_items == 1) {
            $('#count').removeClass('d-none').find('.number').text(total_items + " item");
        } else {
            $('#count').removeClass('d-none').find('.number').text(total_items + " items");
        }
        if (total_files == 0) {
            $('#count').removeClass('d-none').find('.totalsize').text("Zero Files");
        } else if (total_files == 1) {
            $('#count').removeClass('d-none').find('.totalsize').text(total_files + " File with Size " + total_size);
        } else {
            $('#count').removeClass('d-none').find('.totalsize').text(total_files + " Files with Size " + total_size);
        }
    }
}
function render_search_result_list() {
    // Validate search query
    if (!window.MODEL.q || window.MODEL.q.trim() === '') {
        var content = `
            <div class="container"><br>
                <div id="update"></div>
                <div class="card">
                    <div class="alert alert-warning d-flex align-items-center" role="alert" style="margin-bottom: 0;">Please enter a search query</div>
                    <div id="list" class="list-group text-break">
                        <div class="alert alert-info" role="alert">Enter a search term to find files in your drive.</div>
                    </div>
                </div>
            </div>
        `;
        $('#content').html(content);
        return;
    }
    
    var content = `
        <div class="container"><br>
            <div id="update"></div>
            <div class="card">
                <div class="alert alert-primary d-flex align-items-center" role="alert" style="margin-bottom: 0;">Search Results for "${window.MODEL.q}"</div>
                <div id="list" class="list-group text-break"></div>
            </div>
            <div class="alert alert-secondary text-center d-none" role="alert" id="count"><span class="number text-center"></span> | <span class="totalsize text-center"></span></div>
        </div>
  `;
    $('#content').html(content);
    $('#list').html(`<div class="d-flex justify-content-center"><div class="spinner-border text-light m-5" role="status" id="spinner"><span class="visually-hidden"></span></div></div>`);
    function searchSuccessCallback(res, prevReqParams) {
        $('#list')
            .data('nextPageToken', res['nextPageToken'])
            .data('curPageIndex', res['curPageIndex']);
        $('#spinner').remove();
        if (res['nextPageToken'] === null) {
            $(window).off('scroll');
            window.scroll_status.event_bound = false;
            window.scroll_status.loading_lock = false;
            append_search_result_to_list(res['data']['files']);
        } else {
            append_search_result_to_list(res['data']['files']);
            if (window.scroll_status.event_bound !== true) {
                $(window).on('scroll', function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = getDocumentHeight();
                    var windowHeight = $(this).height();
                    if (scrollTop + windowHeight > scrollHeight - (Os.isMobile ? 130 : 80)) {
                        if (window.scroll_status.loading_lock === true) {
                            return;
                        }
                        window.scroll_status.loading_lock = true;
                        $(`<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border text-light m-5" role="status" id="spinner"><span class="visually-hidden"></span></div></div>`)
                        let $list = $('#list');
                        requestSearch({
                            q: window.MODEL.q,
                            page_token: $list.data('nextPageToken'),
                            page_index: $list.data('curPageIndex') + 1
                        },
                            searchSuccessCallback
                        )
                    }
                });
                window.scroll_status.event_bound = true
            }
        }
        if (window.scroll_status.loading_lock === true) {
            window.scroll_status.loading_lock = false
        }
    }
    requestSearch({
        q: window.MODEL.q
    }, searchSuccessCallback);
}
function append_search_result_to_list(files) {
    try {
        const $list = $('#list');
        const isLastPageLoaded = $list.data('nextPageToken') === null;
        
        let html = '';
        let totalSize = 0;

        files.forEach(item => {
            if (!item.size) item.size = "";
            
            html += createFileListItem(item, '', true, false);
            
            if (item.mimeType !== 'application/vnd.google-apps.folder') {
                totalSize += Number(item.size);
            }
        });

        updateFilesList($list, html, $list.data('curPageIndex') === '0');
        
        if (isLastPageLoaded) {
            updateSearchResultCounts($list, totalSize);
        }
    } catch (error) {
        console.error('Error in append_search_result_to_list:', error);
    }
}

function updateSearchResultCounts($list, totalSize) {
    const totalSizeFormatted = formatFileSize(totalSize) || '0 Bytes';
    const totalItems = $list.find('.countitems').length;
    const totalFiles = $list.find('.size_items').length;
    
    const countElement = $('#count');
    countElement.removeClass('d-none');
    
    // Update item count
    if (totalItems === 0) {
        countElement.find('.number').text("No Results");
    } else {
        const itemText = totalItems === 1 ? "item" : "items";
        countElement.find('.number').text(`${totalItems} ${itemText}`);
    }
    
    // Update file size
    if (totalFiles === 0) {
        countElement.find('.totalsize').text("Found Nothing");
    } else {
        const fileText = totalFiles === 1 ? "File" : "Files";
        countElement.find('.totalsize').text(`${totalFiles} ${fileText} with Size ${totalSizeFormatted}`);
    }
}
async function onSearchResultItemClick(fileId, canPreview) {
    const currentDrive = window.current_drive_order;
    
    showModalLoading();
    
    try {
        const response = await fetch(`/${currentDrive}:id2path`, {
            method: 'POST',
            body: JSON.stringify({ id: fileId }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const result = await response.json();
            showModalSuccess(result.path, canPreview);
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error('Error fetching file path:', error);
        showModalFallback(fileId, canPreview);
    }
}

function showModalLoading() {
    $('#SearchModelLabel').html('Loading...');
    $('#modal-body-space').html(`
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-light m-5" role="status">
                <span class="visually-hidden"></span>
            </div>
        </div>`);
}

function showModalSuccess(path, canPreview) {
    const encodedUrl = path.replace(/#/g, '%23').replace(/\?/g, '%3F');
    const viewParam = canPreview ? '?a=view' : '';
    
    $('#SearchModelLabel').html('Result');
    $('#modal-body-space').html(`
        <a class="btn btn-primary" href="${encodedUrl}${viewParam}">Open</a>`);
}

function showModalFallback(fileId, canPreview) {
    const viewParam = canPreview ? 'a=view' : '';
    
    $('#SearchModelLabel').html('Fallback Method');
    $('#modal-body-space').html(`
        <a class="btn btn-primary" href="/fallback?id=${fileId}&${viewParam}">Open</a>`);
}
function get_file(path, file, callback) {
    var key = "file_path_" + path + file['modifiedTime'];
    var data = localStorage.getItem(key);
    if (data != undefined) {
        return callback(data);
    } else {
        $.get(path, function (d) {
            localStorage.setItem(key, d);
            callback(d);
        });
    }
}
async function fallback(id, type) {
    if (type) {
        var cookie_folder_id = await getCookie("root_id") || '';
        $('#content').html(`<div class="d-flex justify-content-center" style="height: 150px"><div class="spinner-border text-light m-5" role="status" id="spinner"><span class="visually-hidden"></span></div></div>`);
        fetch("/0:fallback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
            }),
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                return response.json();
            })
            .then(function (obj) {
                console.log(obj);
                var mimeType = obj.mimeType;
                var fileExtension = obj.fileExtension
                const code = ["php", "css", "go", "java", "js", "json", "txt", "sh", "md", "html", "xml", "py", "rb", "c", "cpp", "h", "hpp"];
                const video = ["mp4", "webm", "avi", "mpg", "mpeg", "mkv", "rm", "rmvb", "mov", "wmv", "asf", "ts", "flv", "3gp", "m4v"];
                const audio = ["mp3", "flac", "wav", "ogg", "m4a", "aac", "wma", "alac"];
                const image = ["bmp", "jpg", "jpeg", "png", "gif", "svg", "tiff", "ico"];
                const pdf = ["pdf"];
                if (mimeType === "application/vnd.google-apps.folder") {
                    window.location.href = window.location.pathname + "/";
                } else if (fileExtension) {
                    const name = obj.name;
                    const encoded_name = encodeURIComponent(name);
                    const size = formatFileSize(obj.size);
                    const url = window.location.origin + obj.link;
                    const file_id = obj.id;
                    if (mimeType.includes("video") || video.includes(fileExtension)) {
                        file_video(name, encoded_name, size, url, mimeType, file_id, cookie_folder_id);
                    } else if (mimeType.includes("audio") || audio.includes(fileExtension)) {
                        file_audio(name, encoded_name, size, url, file_id, cookie_folder_id);
                    } else if (mimeType.includes("image") || image.includes(fileExtension)) {
                        file_image(name, encoded_name, size, url, file_id, cookie_folder_id);
                    } else if (mimeType.includes("pdf") || pdf.includes(fileExtension)) {
                        file_pdf(name, encoded_name, size, url, file_id, cookie_folder_id);
                    } else if (code.includes(fileExtension)) {
                        file_code(name, encoded_name, size, url, file_id, cookie_folder_id);
                    } else {
                        file_others(name, encoded_name, size, url, file_id, cookie_folder_id);
                    }
                }
            })
            .catch(function (error) {
                var content = `
                    <div class="container"><br>
                        <div class="card text-center">
                            <div class="card-body text-center">
                                <div class="alert alert-danger" id="file_details" role="alert"><b>404.</b> That’s an error. ` + error + `</div>
                            </div>
                            <p>The requested URL was not found on this server. That’s all we know.</p>
                            <div class="card-text text-center">
                                <div class="btn-group text-center">
                                    <a href="/" type="button" class="btn btn-primary">Homepage</a>
                                </div>
                            </div><br>
                        </div>
                    </div>`;
                $("#content").html(content);
            });
    } else {
        return list(id, true);
    }
}
async function file(path) {
    var cookie_folder_id = await getCookie("root_id") || '';
    var name = path.split('/').pop();
    $('#content').html(`<div class="d-flex justify-content-center" style="height: 150px;"><div class="spinner-border text-light m-5" role="status" id="spinner"><span class="visually-hidden"></span></div></div>`);
    fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            path: path
        }),
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Request failed");
            }
            return response.json();
        })
        .then(function (obj) {
            console.log(obj);
            var mimeType = obj.mimeType;
            var fileExtension = obj.fileExtension
            const code = ["php", "css", "go", "java", "js", "json", "txt", "sh", "md", "html", "xml", "py", "rb", "c", "cpp", "h", "hpp"];
            const video = ["mp4", "webm", "avi", "mpg", "mpeg", "mkv", "rm", "rmvb", "mov", "wmv", "asf", "ts", "flv", "3gp", "m4v"];
            const audio = ["mp3", "flac", "wav", "ogg", "m4a", "aac", "wma", "alac"];
            const image = ["bmp", "jpg", "jpeg", "png", "gif", "svg", "tiff", "ico"];
            const pdf = ["pdf"];
            if (mimeType === "application/vnd.google-apps.folder") {
                window.location.href = window.location.pathname + "/";
            } else if (fileExtension) {
                const name = obj.name;
                const encoded_name = encodeURIComponent(name);
                const size = formatFileSize(obj.size);
                const url = window.location.origin + obj.link;
                const file_id = obj.id;
                if (mimeType.includes("video") || video.includes(fileExtension)) {
                    file_video(name, encoded_name, size, url, mimeType, file_id, cookie_folder_id);
                } else if (mimeType.includes("audio") || audio.includes(fileExtension)) {
                    file_audio(name, encoded_name, size, url, file_id, cookie_folder_id);
                } else if (mimeType.includes("image") || image.includes(fileExtension)) {
                    file_image(name, encoded_name, size, url, file_id, cookie_folder_id);
                } else if (mimeType.includes("pdf") || pdf.includes(fileExtension)) {
                    file_pdf(name, encoded_name, size, url, file_id, cookie_folder_id);
                } else if (code.includes(fileExtension)) {
                    file_code(name, encoded_name, size, url, file_id, cookie_folder_id);
                } else {
                    file_others(name, encoded_name, size, url, file_id, cookie_folder_id);
                }
            }
        })
        .catch(function (error) {
            var content = `
                <div class="container"><br>
                    <div class="card text-center">
                        <div class="card-body text-center">
                            <div class="alert alert-danger" id="file_details" role="alert"><b>404.</b> That’s an error. ` + error + `</div>
                        </div>
                        <p>The requested URL was not found on this server. That’s all we know.</p>
                        <div class="card-text text-center">
                            <div class="btn-group text-center">
                                <a href="/" type="button" class="btn btn-primary">Homepage</a>
                            </div>
                        </div><br>
                    </div>
                </div>`;
            $("#content").html(content);
        });
}
function file_others(name, encoded_name, size, url, file_id, cookie_folder_id) {
    var path = window.location.pathname;
    var pathParts = path.split('/');
    var navigation = '';
    var new_path = '';
    for (var i = 0; i < pathParts.length; i++) {
        var part = pathParts[i];
        if (i == pathParts.length - 1) {
            new_path += part + '?a=view'
        } else {
            new_path += part + '/'
        }
        if (part.length > 15) {
            part = decodeURIComponent(part);
            part = part.substring(0, 10) + '...';
        }
        if (part == '') {
            part = 'Home'
        }
        navigation += '<a href="' + new_path + '" class="breadcrumb-item">' + part + '</a>';
    }
    $("#content").html(content);
}
function file_code(name, encodedName, size, url, fileId, cookieFolderId) {
    const codeTypes = {
        "html": "html",
        "php": "php", 
        "css": "css",
        "go": "golang",
        "java": "java",
        "js": "javascript",
        "json": "json",
        "txt": "Text",
        "sh": "sh",
        "md": "Markdown"
    };

    const path = window.location.pathname;
    const navigation = buildBreadcrumbNavigation(path);
    const fileExtension = getFileExtension(name);
    
    $('#content').html(createCodeViewerHTML(navigation, name, size));
    
    const spinner = '<div class="d-flex justify-content-center"><div class="spinner-border m-5" role="status"><span class="visually-hidden"></span></div></div>';
    $("#code_spinner").html(spinner);
    
    if (size <= CONSTANTS.MAX_FILE_SIZE) {
        loadAndDisplayCode(url, fileExtension, codeTypes);
    } else {
        showFileTooLargeError();
    }
}

function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

function buildBreadcrumbNavigation(path) {
    const pathParts = path.split('/');
    let navigation = '';
    let newPath = '';
    
    pathParts.forEach((part, index) => {
        if (index === pathParts.length - 1) {
            newPath += part + '?a=view';
        } else {
            newPath += part + '/';
        }
        
        let displayPart = part.length > 15 
            ? decodeURIComponent(part).substring(0, 10) + '...' 
            : part;
        
        if (displayPart === '') displayPart = 'Home';
        
        navigation += `<a href="${newPath}" class="breadcrumb-item">${displayPart}</a>`;
    });
    
    return navigation;
}

function createCodeViewerHTML(navigation, name, size) {
    return `
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">${navigation}</ol>
            </nav>
            <div class="card">
                <div class="card-header">
                    <h5>${name}</h5>
                    <small class="text-muted">${size}</small>
                </div>
                <div class="card-body">
                    <div id="code_spinner"></div>
                    <pre><code id="editor"></code></pre>
                </div>
            </div>
        </div>`;
}

async function loadAndDisplayCode(url, extension, codeTypes) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        
        $('#editor').text(data);
        $("#code_spinner").html("");
        
        const codeType = codeTypes[extension] || "Text";
        // Could add syntax highlighting here if needed
        
    } catch (error) {
        console.error('Error loading code:', error);
        showCodeLoadError();
    }
}

function showFileTooLargeError() {
    $("#code_spinner").html("");
    $('#editor').html(`
        <div class="alert alert-danger" role="alert">
            File size is too large to preview. Maximum limit is ${CONSTANTS.MAX_FILE_SIZE / (1024 * 1024)} MB
        </div>`);
}

function showCodeLoadError() {
    $("#code_spinner").html("");
    $('#editor').html(`
        <div class="alert alert-danger" role="alert">
            Failed to load file content
        </div>`);
}
function file_video(name, encoded_name, size, url, mimeType, file_id, cookie_folder_id) {
    var url_base64 = btoa(url);
    var path = window.location.pathname;
    var pathParts = path.split('/');
    var navigation = '';
    var new_path = '';
    for (var i = 0; i < pathParts.length; i++) {
        var part = pathParts[i];
        if (i == pathParts.length - 1) {
            new_path += part + '?a=view'
        } else {
            new_path += part + '/'
        }
        if (part.length > 15) {
            part = decodeURIComponent(part);
            part = part.substring(0, 10) + '...';
        }
        if (part == '') {
            part = 'Home'
        }
        navigation += '<a href="' + new_path + '" class="breadcrumb-item">' + part + '</a>';
    }
    $("#content").html(content);
}
function file_audio(name, encoded_name, size, url, file_id, cookie_folder_id) {
    var url_base64 = btoa(url);
    var path = window.location.pathname;
    var pathParts = path.split('/');
    var navigation = '';
    var new_path = '';
    for (var i = 0; i < pathParts.length; i++) {
        var part = pathParts[i];
        if (i == pathParts.length - 1) {
            new_path += part + '?a=view'
        } else {
            new_path += part + '/'
        }
        if (part.length > 15) {
            part = decodeURIComponent(part);
            part = part.substring(0, 10) + '...';
        }
        if (part == '') {
            part = 'Home'
        }
        navigation += '<a href="' + new_path + '" class="breadcrumb-item">' + part + '</a>';
    }
    $("#content").html(content);
}
function file_pdf(name, encoded_name, size, url, file_id, cookie_folder_id) {
    var path = window.location.pathname;
    var pathParts = path.split('/');
    var navigation = '';
    var new_path = '';
    for (var i = 0; i < pathParts.length; i++) {
        var part = pathParts[i];
        if (i == pathParts.length - 1) {
            new_path += part + '?a=view'
        } else {
            new_path += part + '/'
        }
        if (part.length > 15) {
            part = decodeURIComponent(part);
            part = part.substring(0, 10) + '...';
        }
        if (part == '') {
            part = 'Home'
        }
        navigation += '<a href="' + new_path + '" class="breadcrumb-item">' + part + '</a>';
    }
    $("#content").html(content);
}
function file_image(name, encoded_name, size, url, file_id, cookie_folder_id) {
    var path = window.location.pathname;
    var pathParts = path.split('/');
    var navigation = '';
    var new_path = '';
    for (var i = 0; i < pathParts.length; i++) {
        var part = pathParts[i];
        if (i == pathParts.length - 1) {
            new_path += part + '?a=view'
        } else {
            new_path += part + '/'
        }
        if (part.length > 15) {
            part = decodeURIComponent(part);
            part = part.substring(0, 10) + '...';
        }
        if (part == '') {
            part = 'Home'
        }
        navigation += '<a href="' + new_path + '" class="breadcrumb-item">' + part + '</a>';
    }
    $('#content').html(content);
}
function utc2jakarta(utc_datetime) {
    var utcDate = new Date(utc_datetime);
    var jakartaDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
    var year = jakartaDate.getFullYear();
    var month = ('0' + (jakartaDate.getMonth() + 1)).slice(-2);
    var date = ('0' + jakartaDate.getDate()).slice(-2);
    var hour = ('0' + jakartaDate.getHours()).slice(-2);
    var minute = ('0' + jakartaDate.getMinutes()).slice(-2);
    var second = ('0' + jakartaDate.getSeconds()).slice(-2);
    return `${date}-${month}-${year} ${hour}:${minute}:${second}`;
}
function formatFileSize(bytes) {
    if (bytes >= 1099511627776) {
        bytes = (bytes / 1099511627776).toFixed(2) + ' TB';
    } else if (bytes >= 1073741824) {
        bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
        bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
        bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes > 1) {
        bytes = bytes + ' bytes';
    } else if (bytes === 1) {
        bytes = bytes + ' byte';
    } else {
        bytes = '';
    }
    return bytes;
}
String.prototype.trim = function (char) {
    if (char) {
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};
function markdown(el, data) {
    var html = marked.parse(data);
    $(el).show().html(html);
}
window.onpopstate = function () {
    var path = window.location.pathname;
    render(path);
}
$(function () {
    init();
    var path = window.location.pathname;
    render(path);
});
function copyFunction() {
    var copyText = document.getElementById("dlurl");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value)
        .then(function () {
            var tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Copied";
        })
        .catch(function (error) {
            console.error("Failed to copy text: ", error);
        });
}
function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy";
}
function updateCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectAllCheckbox = document.getElementById('select-all-checkboxes');

    if (checkboxes.length > 0 && selectAllCheckbox) {
        selectAllCheckbox.addEventListener('click', () => {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
}
async function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
async function copyFile(driveId) {
    const statusElement = document.getElementById('copystatus');
    const spinnerElement = document.getElementById('spinner');
    const userFolderId = document.getElementById('user_folder_id')?.value;

    if (!userFolderId) {
        showCopyStatus(statusElement, 'Empty ID', 'danger');
        return null;
    }

    try {
        showCopyStatus(statusElement, 'Processing...', 'info');
        showSpinner(spinnerElement, true);

        await setCookieWithExpiration('root_id', userFolderId);
        
        const response = await performCopyRequest(driveId, userFolderId);
        await handleCopyResponse(response, statusElement);
        
    } catch (error) {
        console.error('Copy file error:', error);
        showCopyStatus(statusElement, `An error occurred: ${error.message}`, 'danger');
    } finally {
        showSpinner(spinnerElement, false);
    }
}

function showCopyStatus(element, message, type) {
    if (!element) return;
    element.innerHTML = `<div class='alert alert-${type}' role='alert'>${message}</div>`;
}

function showSpinner(element, show) {
    if (!element) return;
    element.style.display = show ? 'block' : 'none';
}

async function setCookieWithExpiration(name, value) {
    const expirationDate = new Date('2050-12-18T12:00:00Z');
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}`;
}

async function performCopyRequest(driveId, userFolderId) {
    const timestamp = Math.floor(Date.now() / 1000);
    const requestBody = new URLSearchParams({
        id: driveId,
        root_id: userFolderId,
        resourcekey: 'null',
        time: timestamp.toString()
    });

    return await fetch('/copy', {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: requestBody
    });
}

async function handleCopyResponse(response, statusElement) {
    if (response.status === 500) {
        showCopyStatus(statusElement, 'Unable to Copy File', 'danger');
    } else if (response.status === 401) {
        showCopyStatus(statusElement, 'Unauthorized', 'danger');
    } else if (response.ok) {
        const data = await response.json();
        handleSuccessfulCopy(data, statusElement);
    } else {
        showCopyStatus(statusElement, 'Unable to Copy File', 'danger');
    }
}

function handleSuccessfulCopy(data, statusElement) {
    if (data?.name && data?.id) {
        const fileLink = `https://drive.google.com/file/d/${data.id}/view?usp=share_link`;
        displayCopyResult(fileLink);
        showCopyStatus(statusElement, 'File copied successfully!', 'success');
    } else if (data?.error?.message) {
        showCopyStatus(statusElement, data.error.message, 'danger');
    } else {
        showCopyStatus(statusElement, 'Unable to Copy File', 'danger');
    }
}

function displayCopyResult(fileLink) {
    const copyResultElement = document.getElementById('copyresult');
    if (!copyResultElement) return;

    copyResultElement.innerHTML = `
        <div class="col-12 col-md-12">
            <input type="text" id="usercopiedfile" class="form-control" 
                   value="${fileLink}" readonly>
        </div>
        <div class="col-12 col-md-12">
            <a href="${fileLink}" target="_blank" style="margin-top: 5px;" 
               class="btn btn-danger btn-block">Open Copied File</a>
        </div>`;
}
const observer = new MutationObserver(() => {
    updateCheckboxes();
});
const options = {
    childList: true,
    subtree: true
};
observer.observe(document.documentElement, options);
