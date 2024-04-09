/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: LiYansheng
 * @Date: 2023-03-18 02:02:28
 * @LastEditors: CoderXZ
 * @LastEditTime: 2023-03-18 19:47:30
 */
hexo.extend.filter.register('theme_inject', function(injects) {
    injects.head.file('baiduStatics', 'scripts/baidu_statics.ejs', { key: 'value' }, -1);
});
