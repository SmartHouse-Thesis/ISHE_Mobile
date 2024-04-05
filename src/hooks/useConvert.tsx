const useConvert = () => {
    const toMoney = (value: any) => {
        if(value) {
            const formattedAmount = value.toLocaleString('en-US');
            return `${formattedAmount}đ`
        }
        return value
    }

    return {
        toMoney
    }
}

export default useConvert