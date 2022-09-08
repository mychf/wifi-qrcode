FROM cowell-images.tencentcloudcr.com/cowellpi/nginx:1.12.2

USER root
COPY dist/ /usr/share/nginx/ai-h5-hmo/
COPY nginx.conf /etc/nginx/nginx.conf

RUN echo $BUILD_ENV

ENTRYPOINT ["/usr/sbin/nginx","-c","/etc/nginx/nginx.conf","-g", "daemon off;"]

EXPOSE 8080/tcp
