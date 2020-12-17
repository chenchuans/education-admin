export const handleTimeFormatter = (value: string) => value.substr(0, 10);

/**
 * 复制内容到粘贴板
 * content : 需要复制的内容
 */
export const copyToClip = (content: string) => {
    let aux = document.createElement("input");
    aux.setAttribute("value", '122324');
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
};
