import HocModule from "../others/hoc"
import ErrorModule from "../others/error_boundary"
import {routes} from "../Routes/Routers"
import ReducerModule from "../redux/reducer"
import image from "../assets/avatar.jpg"


export const Hoc=HocModule
export const ErrorBoundary=ErrorModule
export const routings=routes
export const Reducer=ReducerModule
export const images={
    im1:image
}