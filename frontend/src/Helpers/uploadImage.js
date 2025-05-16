const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_CLOUDINARY}/image/upload`

console.log("url : ",url)
const uploadImage = async (image) => {
    
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","ShopEasy_Product")
    
    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })

    return dataResponse.json()
}

export default uploadImage