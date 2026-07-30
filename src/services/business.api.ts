import { axiosInstance } from "@/lib/axiosInstance"
import { toast } from "sonner"


export const fetchBusinessById = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/api/business/${id}`)
        return res.data
    } catch (error) {
        toast.error("Failed to fetch the data")
        console.log(error)
    }
}