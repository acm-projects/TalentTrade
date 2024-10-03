import { SkillContext } from "../context/SkillContext"
import { useContext } from "react"

export const useUserContext = () => {
    const context = useContext(SkillContext)

    if (!context) {
        throw Error("used context must be used instide a pprovider")
    }

    return context
}