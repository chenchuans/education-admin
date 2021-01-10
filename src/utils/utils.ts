export const handleTimeFormatter = (value: string) => value.substr(0, 10);

/**
 * 复制内容到粘贴板
 * content : 需要复制的内容
 */
export const copyToClip = (content: string) => {
    let aux = document.createElement("input");
    aux.setAttribute("value", content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
};


//时间戳转化成时间格式
export const timeFormat = (timestamp: number) => {
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    const add0 = (m: number) => m < 10 ? '0' + m : m;
    let time = new Date(timestamp);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
}
