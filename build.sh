#!/bin/bash

# 环境变量BUILD_ENV值为Test|Stage|Prod
# 环境变量BUILD_VERSION为构建的版本号，格式为1.1.2+{Jenkin Job ID}

anynowtime="date +'%Y-%m-%d %H:%M:%S'"
NOW="echo [\`$anynowtime\`][PID:$$]"

##### 可在脚本开始运行时调用，打印当时的时间戳及PID。
job_start()
{
    MSG="$*"
    echo "`eval $NOW` START:[$MSG]"
}

##### 可在脚本执行成功的逻辑分支处调用，打印当时的时间戳及PID。
job_success()
{
    MSG="$*"
    echo "`eval $NOW` job_success:[$MSG]"
    exit 0
}

##### 可在脚本执行失败的逻辑分支处调用，打印当时的时间戳及PID。
job_fail()
{
    MSG="$*"
    echo "`eval $NOW` job_fail:[$MSG]"
    exit 1
}

echo "`当前环境: $BUILD_ENV`"

job_start "Installing dependencies ..."

if [ $BUILD_ENV = 'Test' ];then
  sed -i 's,<url_hmo>,https://mapi-test.xxxx.cn,' ./nginx.conf
  sed -i 's,<url_uaa>,https://api-test.xxxx.cn,' ./nginx.conf
  sed -i 's,<url_his>,https://api-test.xxxx.com,' ./nginx.conf
elif [ $BUILD_ENV = 'Stage' ];then
  sed -i 's,<url_hmo>,https://mapi-stage.xxxx.cn,' ./nginx.conf
  sed -i 's,<url_uaa>,https://api-stage.xxxx.cn,' ./nginx.conf
  sed -i 's,<url_his>,https://api-stage.xxxx.com,' ./nginx.conf
else
  sed -i 's,<url_hmo>,https://mapi.xxxx.cn,' ./nginx.conf
  sed -i 's,<url_uaa>,https://api.xxxx.cn,' ./nginx.conf
  sed -i 's,<url_his>,https://api.xxxx.com,' ./nginx.conf
fi

echo "---------------------nginx.conf-start-------------------------"

cat ./nginx.conf

echo "---------------------nginx.conf-end-------------------------"

npm install

job_start "Building dist"
# cnpm build根据工程package.json的配置填充
case ${BUILD_ENV} in
    Test)
        cnpm run build:test
        ;;
    Stage)
        cnpm run build:stage
        ;;
    Prod)
        cnpm run build
        ;;
    *)
        cnpm run build
        ;;
esac

if [ $? -eq 0 ];then
    job_success "Build finished"
else
    job_fail "Build failed"
fi
