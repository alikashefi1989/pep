// module
import { FC } from "react"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon"
// custom
import PATH from "../enum/path"

interface RouteModel {
    title: string
    path: PATH
    isMenuItem: boolean
    Cmp: FC<{}>
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
}

export default RouteModel