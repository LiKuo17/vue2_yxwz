<template>
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="loadList">
            <slot :list="list"></slot>
      </van-list>
</template>

<script>
import { List, Toast  } from "vant";
export default {
      props: {
            httpType: {
                  type: String,
                  required: true,
                  default: 'get'
            },
            url: {
                  type: String,
                  required: true,
            },
            rows: {
                  default: 10,
            },
            params: {
                  type: Object,
                  defautl: () => new Object(),
            },
            pageSizeKey: {
                  type: String,
                  default: "rows",
            },
            pageNumKey: {
                  type: String,
                  default: "page",
            },
            validate: {
                  type: Function,
                  default: res => res,
            },
      },
      components: {
            [List.name]: List,
            [Toast.name]: Toast
      },
      data() {
            return {
                  finishedText: "暂无内容~",
                  page: 0,
                  loading: false,
                  finished: false,
                  list: [],
            };
      },
      methods: {
            loadList() {
                  this.page++;
                  this.getList();
            },
            getList() {
                  let fixedParams = { [this.pageSizeKey]: this.rows, [this.pageNumKey]: this.page };
                  let options = {}
                        if(this.httpType="get"){
                              options = {
                                    params:{...fixedParams,...this.params}
                              }
                        }else if(this.httpType="post"){
                              options =  {...fixedParams,...this.params}
                        }
                        console.log(this.httpType,'this.httpType');
                        this.$http[this.httpType](this.url, options).then(res => {
                              if(res.result == -1){
                                    this.finished = true;
                                    Toast('服务器错误')
                              }else {
                                    //单次加载完成
                                    this.loading = false;
                                    console.log(this.loading,'loading');
                                    //如果有数据则push
                                    if (this.validate(res).Rows && this.validate(res).Rows.length > 0) {
                                          this.list = this.list.concat(this.validate(res).Rows);
                                    }
                                    if (this.validate(res).rows && this.validate(res).rows.length > 0) {
                                          this.list = this.list.concat(this.validate(res).rows);
                                    }
                                    //如果当前页数为最大页数（总条数除以每页条数，上进）
                                    if (this.page == Math.ceil(this.validate(res).records / this.rows)) {
                                          //结束所有加载
                                          this.finished = true;
                                          this.finishedText = "没有更多了~";
                                    }
                                    //如果总条数为0
                                    if (this.validate(res).records == 0) {
                                          //结束所有加载
                                          this.finished = true;
                                          this.finishedText = "暂无内容~";
                                    }
                                          console.log(res,'res111111');
                                    } 
                        });
                  } 
            },
};
</script>
