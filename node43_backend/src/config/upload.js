import multer, { diskStorage } from 'multer'
// yarn add multer
// process.cwd(): trả về đường dẫn gốc của project
export const upload = multer({

    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",// định nghĩa thư mục lưu file,
        filename: (req, file, callback) => { // đổi tên file

            //  ◦•●◉✿๖ۣۜ£¡ղƙ ✘¡ղƙ đẹρッ✿◉●•◦      .jpg
            // a-z, 0-9, A-Z

            let newName = new Date().getTime() + "_" + file.originalname; // 17442042443 , DD_MM_YYYY_hh_mm_ss_ms

            callback(null, newName)
        }
    })
})