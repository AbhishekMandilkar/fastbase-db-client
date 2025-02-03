import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

  
  import React from 'react'
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs"
  
  const Breadcrumbs = () => {
    const breadcrumbs = useReactRouterBreadcrumbs()
    return (
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb) => (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink>{breadcrumb.breadcrumb}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    )
  }
  
  export default Breadcrumbs