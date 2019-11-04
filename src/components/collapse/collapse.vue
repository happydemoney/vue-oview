<template>
    <!-- <div :class="classes">
        <slot></slot>
    </div> -->
    <div class="wrapper">
        <transition-group :class="classes" tag="div" v-if="mounted">
            <slot></slot>
        </transition-group>
    </div>
</template>
<script>
    const prefixCls = 'ov-collapse';
    export default {
        name: 'Collapse',
        props: {
            accordion: {
                type: Boolean,
                default: false
            },
            value: {
                type: [Array, String]
            },
            simple: {
                type: Boolean,
                default: false
            },
            draggable: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentValue: this.value,
                mounted: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-simple`]: this.simple
                    }
                ];
            }
        },
        mounted () {
            this.mounted = true
            this.setActive();
        },
        methods: {
            setActive () {
                const activeKey = this.getActiveKey();
                this.$nextTick(() => {
                    this.$children[0].$children.forEach((child, index) => {
                        const name = child.name || index.toString();
                        child.isActive = activeKey.indexOf(name) > -1;
                        child.index = index;
                        child.draggable = this.draggable // 是否启用拖拽
                    });
                });
            },
            getActiveKey () {
                let activeKey = this.currentValue || [];
                const accordion = this.accordion;
                if (!Array.isArray(activeKey)) {
                    activeKey = [activeKey];
                }
                if (accordion && activeKey.length > 1) {
                    activeKey = [activeKey[0]];
                }
                for (let i = 0; i < activeKey.length; i++) {
                    activeKey[i] = activeKey[i].toString();
                }
                return activeKey;
            },
            toggle (data) {
                const name = data.name.toString();
                let newActiveKey = [];
                if (this.accordion) {
                    if (!data.isActive) {
                        newActiveKey.push(name);
                    }
                } else {
                    let activeKey = this.getActiveKey();
                    const nameIndex = activeKey.indexOf(name);
                    if (data.isActive) {
                        if (nameIndex > -1) {
                            activeKey.splice(nameIndex, 1);
                        }
                    } else {
                        if (nameIndex < 0) {
                            activeKey.push(name);
                        }
                    }
                    newActiveKey = activeKey;
                }
                this.currentValue = newActiveKey;
                this.$emit('input', newActiveKey);
                this.$emit('on-change', newActiveKey);
            },
            handleDrop (dragIndex, dropIndex) {
              // 是否需要数据转换
              if (dragIndex === dropIndex) {
                return
              }
              // 复制源数据
              const childrenCopy = this.$children[0].$children.slice()
              // 对数据进行交换
              childrenCopy.splice(dropIndex, 0, ...childrenCopy.splice(dragIndex, 1))
              this.$children[0].$children = []
              this.$children[0].$children.push(...childrenCopy)
              this.resetChildIndex()
              this.$emit('dragComplete', dragIndex, dropIndex)
            },
            resetChildIndex () {
              this.$children[0].$children.forEach((child, index) => {
                child.index = index
              })
            }
        },
        watch: {
            value (val) {
                this.currentValue = val;
            },
            currentValue () {
                this.setActive();
            }
        }
    };
</script>