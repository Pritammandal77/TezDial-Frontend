import { axiosInstance } from "@/lib/axiosInstance"



export const createNewBusiness = async (data: any) => {
    const res = await axiosInstance.post("/api/business/new", data)
    return res.data
}