import React, {  Suspense } from 'react';
import {ErrorBoundary
} from "../variables/importfile"
import "../assets/style.css"
function WithLoading(Component) {
  return class extends React.Component  {

    render(){
   return  <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>}>
    <Suspense fallback={ <div className="loader">Loading...</div>
}>
    <Component  {...this.props} />
    </Suspense>
    </ErrorBoundary>
    }
 
  };
}

export default WithLoading;