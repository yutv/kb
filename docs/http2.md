##Check HTTP2 support
    
    curl --http2 -vI https://http1.golang.org/ 2>&1 | grep ALPN
    * ALPN, offering h2
    * ALPN, offering http/1.1
    * ALPN, server did not agree to a protocol
    
    curl --http2 -vI https://http2.golang.org/ 2>&1 | grep ALPN
    * ALPN, offering h2
    * ALPN, offering http/1.1
    * ALPN, server accepted to use h2

##httpd.conf

    Protocols h2 http/1.1

