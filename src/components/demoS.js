{
    Object.keys(routesConfig).map(key =>
        routesConfig[key].map(r => {
            const route = r => {
                const Component = AllComponents[r.component];
                return (
                    <Route
                        key={r.route || r.key}
                        exact
                        path={r.route || r.key}
                        render={props => {
                            const reg = /\?\S*/g;
                            // 匹配?及其以后字符串
                            const queryParams = window.location.hash.match(reg);
                            // 去除?的参数
                            const { params } = props.match;
                            Object.keys(params).forEach(key => {
                                params[key] = params[key] && params[key].replace(reg, '');
                            });
                            props.match.params = { ...params };
                            const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} };
                            // 回传route配置
                            onRouterChange && onRouterChange(r);
                            return r.login
                                ? <Component {...merge} />
                                : this.requireLogin(<Component {...merge} />, r.auth)
                        }}
                    />
                )
            }
            return r.component ? route(r) : r.subs.map(r => route(r));
        })
    )
}



