<template>
  <div class="xq-emoji-panel xq-over-auto">
    <a @click="input('[微笑]', 0)"
      ><i class="xq-wechat-emoji xq-wechat-emoji0"></i
    ></a>

    <a @click="input('[撇嘴]', 1)"
      ><i class="xq-wechat-emoji xq-wechat-emoji1"></i
    ></a>

    <a @click="input('[色]', 2)"
      ><i class="xq-wechat-emoji xq-wechat-emoji2"></i
    ></a>

    <a @click="input('[发呆]', 3)"
      ><i class="xq-wechat-emoji xq-wechat-emoji3"></i
    ></a>

    <a @click="input('[得意]', 4)"
      ><i class="xq-wechat-emoji xq-wechat-emoji4"></i
    ></a>

    <a @click="input('[流泪]', 5)"
      ><i class="xq-wechat-emoji xq-wechat-emoji5"></i
    ></a>

    <a @click="input('[害羞]', 6)"
      ><i class="xq-wechat-emoji xq-wechat-emoji6"></i
    ></a>

    <a @click="input('[闭嘴]', 7)"
      ><i class="xq-wechat-emoji xq-wechat-emoji7"></i
    ></a>

    <a @click="input('[睡]', 8)"
      ><i class="xq-wechat-emoji xq-wechat-emoji8"></i
    ></a>

    <a @click="input('[大哭]', 9)"
      ><i class="xq-wechat-emoji xq-wechat-emoji9"></i
    ></a>

    <a @click="input('[尴尬]', 10)"
      ><i class="xq-wechat-emoji xq-wechat-emoji10"></i
    ></a>

    <a @click="input('[发怒]', 11)"
      ><i class="xq-wechat-emoji xq-wechat-emoji11"></i
    ></a>

    <a @click="input('[调皮]', 12)"
      ><i class="xq-wechat-emoji xq-wechat-emoji12"></i
    ></a>

    <a @click="input('[呲牙]', 13)"
      ><i class="xq-wechat-emoji xq-wechat-emoji13"></i
    ></a>

    <a @click="input('[惊讶]', 14)"
      ><i class="xq-wechat-emoji xq-wechat-emoji14"></i
    ></a>

    <a @click="input('[难过]', 15)"
      ><i class="xq-wechat-emoji xq-wechat-emoji15"></i
    ></a>

    <a @click="input('[囧]', 16)"
      ><i class="xq-wechat-emoji xq-wechat-emoji16"></i
    ></a>

    <a @click="input('[抓狂]', 17)"
      ><i class="xq-wechat-emoji xq-wechat-emoji17"></i
    ></a>

    <a @click="input('[吐]', 18)"
      ><i class="xq-wechat-emoji xq-wechat-emoji18"></i
    ></a>

    <a @click="input('[偷笑]', 19)"
      ><i class="xq-wechat-emoji xq-wechat-emoji19"></i
    ></a>

    <a @click="input('[愉快]', 20)"
      ><i class="xq-wechat-emoji xq-wechat-emoji20"></i
    ></a>

    <a @click="input('[白眼]', 21)"
      ><i class="xq-wechat-emoji xq-wechat-emoji21"></i
    ></a>

    <a @click="input('[傲慢]', 22)"
      ><i class="xq-wechat-emoji xq-wechat-emoji22"></i
    ></a>

    <a @click="input('[困]', 23)"
      ><i class="xq-wechat-emoji xq-wechat-emoji23"></i
    ></a>

    <a @click="input('[惊恐]', 24)"
      ><i class="xq-wechat-emoji xq-wechat-emoji24"></i
    ></a>

    <a @click="input('[憨笑]', 25)"
      ><i class="xq-wechat-emoji xq-wechat-emoji25"></i
    ></a>

    <a @click="input('[悠闲]', 26)"
      ><i class="xq-wechat-emoji xq-wechat-emoji26"></i
    ></a>

    <a @click="input('[咒骂]', 27)"
      ><i class="xq-wechat-emoji xq-wechat-emoji27"></i
    ></a>

    <a @click="input('[疑问]', 28)"
      ><i class="xq-wechat-emoji xq-wechat-emoji28"></i
    ></a>

    <a @click="input('[嘘]', 29)"
      ><i class="xq-wechat-emoji xq-wechat-emoji29"></i
    ></a>

    <a @click="input('[晕]', 30)"
      ><i class="xq-wechat-emoji xq-wechat-emoji30"></i
    ></a>

    <a @click="input('[衰]', 31)"
      ><i class="xq-wechat-emoji xq-wechat-emoji31"></i
    ></a>

    <a @click="input('[骷髅]', 32)"
      ><i class="xq-wechat-emoji xq-wechat-emoji32"></i
    ></a>

    <a @click="input('[敲打]', 33)"
      ><i class="xq-wechat-emoji xq-wechat-emoji33"></i
    ></a>

    <a @click="input('[再见]', 34)"
      ><i class="xq-wechat-emoji xq-wechat-emoji34"></i
    ></a>

    <a @click="input('[擦汗]', 35)"
      ><i class="xq-wechat-emoji xq-wechat-emoji35"></i
    ></a>

    <a @click="input('[抠鼻]', 36)"
      ><i class="xq-wechat-emoji xq-wechat-emoji36"></i
    ></a>

    <a @click="input('[鼓掌]', 37)"
      ><i class="xq-wechat-emoji xq-wechat-emoji37"></i
    ></a>

    <a @click="input('[坏笑]', 38)"
      ><i class="xq-wechat-emoji xq-wechat-emoji38"></i
    ></a>

    <a @click="input('[右哼哼]', 39)"
      ><i class="xq-wechat-emoji xq-wechat-emoji39"></i
    ></a>

    <a @click="input('[鄙视]', 40)"
      ><i class="xq-wechat-emoji xq-wechat-emoji40"></i
    ></a>

    <a @click="input('[委屈]', 41)"
      ><i class="xq-wechat-emoji xq-wechat-emoji41"></i
    ></a>

    <a @click="input('[快哭了]', 42)"
      ><i class="xq-wechat-emoji xq-wechat-emoji42"></i
    ></a>

    <a @click="input('[阴险]', 43)"
      ><i class="xq-wechat-emoji xq-wechat-emoji43"></i
    ></a>

    <a @click="input('[亲亲]', 44)"
      ><i class="xq-wechat-emoji xq-wechat-emoji44"></i
    ></a>

    <a @click="input('[可怜]', 45)"
      ><i class="xq-wechat-emoji xq-wechat-emoji45"></i
    ></a>

    <a @click="input('[笑脸]', 46)"
      ><i class="xq-wechat-emoji xq-wechat-emoji46"></i
    ></a>

    <a @click="input('[口罩]', 47)"
      ><i class="xq-wechat-emoji xq-wechat-emoji47"></i
    ></a>

    <a @click="input('[脸红]', 48)"
      ><i class="xq-wechat-emoji xq-wechat-emoji48"></i
    ></a>

    <a @click="input('[破涕为笑]', 49)"
      ><i class="xq-wechat-emoji xq-wechat-emoji49"></i
    ></a>

    <a @click="input('[恐惧]', 50)"
      ><i class="xq-wechat-emoji xq-wechat-emoji50"></i
    ></a>

    <a @click="input('[失望]', 51)"
      ><i class="xq-wechat-emoji xq-wechat-emoji51"></i
    ></a>

    <a @click="input('[无语]', 52)"
      ><i class="xq-wechat-emoji xq-wechat-emoji52"></i
    ></a>

    <a @click="input('[嘿哈]', 53)"
      ><i class="xq-wechat-emoji xq-wechat-emoji53"></i
    ></a>

    <a @click="input('[捂脸]', 54)"
      ><i class="xq-wechat-emoji xq-wechat-emoji54"></i
    ></a>

    <a @click="input('[奸笑]', 55)"
      ><i class="xq-wechat-emoji xq-wechat-emoji55"></i
    ></a>

    <a @click="input('[机智]', 56)"
      ><i class="xq-wechat-emoji xq-wechat-emoji56"></i
    ></a>

    <a @click="input('[皱眉]', 57)"
      ><i class="xq-wechat-emoji xq-wechat-emoji57"></i
    ></a>

    <a @click="input('[耶]', 58)"
      ><i class="xq-wechat-emoji xq-wechat-emoji58"></i
    ></a>

    <a @click="input('[吃瓜]', 59)"
      ><i class="xq-wechat-emoji xq-wechat-emoji59"></i
    ></a>

    <a @click="input('[加油]', 60)"
      ><i class="xq-wechat-emoji xq-wechat-emoji60"></i
    ></a>

    <a @click="input('[汗]', 61)"
      ><i class="xq-wechat-emoji xq-wechat-emoji61"></i
    ></a>

    <a @click="input('[天啦]', 62)"
      ><i class="xq-wechat-emoji xq-wechat-emoji62"></i
    ></a>

    <a @click="input('[Emm]', 63)"
      ><i class="xq-wechat-emoji xq-wechat-emoji63"></i
    ></a>

    <a @click="input('[社会]', 64)"
      ><i class="xq-wechat-emoji xq-wechat-emoji64"></i
    ></a>

    <a @click="input('[旺柴]', 65)"
      ><i class="xq-wechat-emoji xq-wechat-emoji65"></i
    ></a>

    <a @click="input('[好的]', 66)"
      ><i class="xq-wechat-emoji xq-wechat-emoji66"></i
    ></a>

    <a @click="input('[打脸]', 67)"
      ><i class="xq-wechat-emoji xq-wechat-emoji67"></i
    ></a>

    <a @click="input('[哇]', 68)"
      ><i class="xq-wechat-emoji xq-wechat-emoji68"></i
    ></a>

    <a @click="input('[翻白眼]', 69)"
      ><i class="xq-wechat-emoji xq-wechat-emoji69"></i
    ></a>

    <a @click="input('[666]', 70)"
      ><i class="xq-wechat-emoji xq-wechat-emoji70"></i
    ></a>

    <a @click="input('[让我看看]', 71)"
      ><i class="xq-wechat-emoji xq-wechat-emoji71"></i
    ></a>

    <a @click="input('[叹气]', 72)"
      ><i class="xq-wechat-emoji xq-wechat-emoji72"></i
    ></a>

    <a @click="input('[苦涩]', 73)"
      ><i class="xq-wechat-emoji xq-wechat-emoji73"></i
    ></a>

    <a @click="input('[裂开]', 74)"
      ><i class="xq-wechat-emoji xq-wechat-emoji74"></i
    ></a>

    <a @click="input('[嘴唇]', 75)"
      ><i class="xq-wechat-emoji xq-wechat-emoji75"></i
    ></a>

    <a @click="input('[爱心]', 76)"
      ><i class="xq-wechat-emoji xq-wechat-emoji76"></i
    ></a>

    <a @click="input('[心碎]', 77)"
      ><i class="xq-wechat-emoji xq-wechat-emoji77"></i
    ></a>

    <a @click="input('[拥抱]', 78)"
      ><i class="xq-wechat-emoji xq-wechat-emoji78"></i
    ></a>

    <a @click="input('[强]', 79)"
      ><i class="xq-wechat-emoji xq-wechat-emoji79"></i
    ></a>

    <a @click="input('[弱]', 80)"
      ><i class="xq-wechat-emoji xq-wechat-emoji80"></i
    ></a>

    <a @click="input('[握手]', 81)"
      ><i class="xq-wechat-emoji xq-wechat-emoji81"></i
    ></a>

    <a @click="input('[胜利]', 82)"
      ><i class="xq-wechat-emoji xq-wechat-emoji82"></i
    ></a>

    <a @click="input('[抱拳]', 83)"
      ><i class="xq-wechat-emoji xq-wechat-emoji83"></i
    ></a>

    <a @click="input('[勾引]', 84)"
      ><i class="xq-wechat-emoji xq-wechat-emoji84"></i
    ></a>

    <a @click="input('[拳头]', 85)"
      ><i class="xq-wechat-emoji xq-wechat-emoji85"></i
    ></a>

    <a @click="input('[OK]', 86)"
      ><i class="xq-wechat-emoji xq-wechat-emoji86"></i
    ></a>

    <a @click="input('[合十]', 87)"
      ><i class="xq-wechat-emoji xq-wechat-emoji87"></i
    ></a>

    <a @click="input('[啤酒]', 88)"
      ><i class="xq-wechat-emoji xq-wechat-emoji88"></i
    ></a>

    <a @click="input('[咖啡]', 89)"
      ><i class="xq-wechat-emoji xq-wechat-emoji89"></i
    ></a>

    <a @click="input('[蛋糕]', 90)"
      ><i class="xq-wechat-emoji xq-wechat-emoji90"></i
    ></a>

    <a @click="input('[玫瑰]', 91)"
      ><i class="xq-wechat-emoji xq-wechat-emoji91"></i
    ></a>

    <a @click="input('[凋谢]', 92)"
      ><i class="xq-wechat-emoji xq-wechat-emoji92"></i
    ></a>

    <a @click="input('[菜刀]', 93)"
      ><i class="xq-wechat-emoji xq-wechat-emoji93"></i
    ></a>

    <a @click="input('[炸弹]', 94)"
      ><i class="xq-wechat-emoji xq-wechat-emoji94"></i
    ></a>

    <a @click="input('[便便]', 95)"
      ><i class="xq-wechat-emoji xq-wechat-emoji95"></i
    ></a>

    <a @click="input('[月亮]', 96)"
      ><i class="xq-wechat-emoji xq-wechat-emoji96"></i
    ></a>

    <a @click="input('[太阳]', 97)"
      ><i class="xq-wechat-emoji xq-wechat-emoji97"></i
    ></a>

    <a @click="input('[庆祝]', 98)"
      ><i class="xq-wechat-emoji xq-wechat-emoji98"></i
    ></a>

    <a @click="input('[礼物]', 99)"
      ><i class="xq-wechat-emoji xq-wechat-emoji99"></i
    ></a>

    <a @click="input('[红包]', 100)"
      ><i class="xq-wechat-emoji xq-wechat-emoji100"></i
    ></a>

    <a @click="input('[發]', 101)"
      ><i class="xq-wechat-emoji xq-wechat-emoji101"></i
    ></a>

    <a @click="input('[福]', 102)"
      ><i class="xq-wechat-emoji xq-wechat-emoji102"></i
    ></a>

    <a @click="input('[烟花]', 103)"
      ><i class="xq-wechat-emoji xq-wechat-emoji103"></i
    ></a>

    <a @click="input('[爆竹]', 104)"
      ><i class="xq-wechat-emoji xq-wechat-emoji104"></i
    ></a>

    <a @click="input('[猪头]', 105)"
      ><i class="xq-wechat-emoji xq-wechat-emoji105"></i
    ></a>

    <a @click="input('[跳跳]', 106)"
      ><i class="xq-wechat-emoji xq-wechat-emoji106"></i
    ></a>

    <a @click="input('[发抖]', 107)"
      ><i class="xq-wechat-emoji xq-wechat-emoji107"></i
    ></a>

    <a @click="input('[转圈]', 108)"
      ><i class="xq-wechat-emoji xq-wechat-emoji108"></i
    ></a>
  </div>
</template>

<script>
export default {
  methods: {
    input(key, value) {
      this.$emit("input", key, value);
    },
  },
};
</script>
