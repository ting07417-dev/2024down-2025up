document.addEventListener('DOMContentLoaded', () => {
    const balloons = document.querySelectorAll('.balloon');
    const imageContainer = document.querySelector('.image-container');
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    const calligraphyPage = document.querySelector('.calligraphy-page');

    // 创建流星
    function createShootingStar(container) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        container.appendChild(star);
        
        // 动画结束后移除流星
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // 定期创建流星
    function startShootingStars(container) {
        setInterval(() => {
            createShootingStar(container);
        }, 1000);
    }

    // 自动播放序列
    function startAutoPlay() {
        let currentIndex = 0;
        let isLastImage = false;
        
        function showNextImage() {
            if (currentIndex >= balloons.length) {
                currentIndex = 0;
            }

            const balloon = balloons[currentIndex];
            const imageWrapper = imageWrappers[currentIndex];

            // 气球爆炸动画
            balloon.classList.add('explode');
            
            // 显示图片容器
            imageContainer.style.display = 'flex';
            
            // 延迟显示图片
            setTimeout(() => {
                imageWrapper.style.display = 'block';
                imageWrapper.classList.add('show-image');
                startShootingStars(imageWrapper);
            }, 500);

            // 检查是否是最后一张图片
            isLastImage = currentIndex === balloons.length - 1;

            // 3秒后关闭当前图片
            setTimeout(() => {
                if (isLastImage) {
                    // 添加翻页动画
                    imageWrapper.classList.add('page-turn');
                    
                    // 延迟显示书法页面
                    setTimeout(() => {
                        imageContainer.style.display = 'none';
                        calligraphyPage.classList.add('show');
                    }, 1500);
                } else {
                    imageWrapper.style.display = 'none';
                    imageWrapper.classList.remove('show-image');
                    imageContainer.style.display = 'none';
                    balloon.classList.remove('explode');
                    
                    // 重置气球
                    setTimeout(() => {
                        balloon.style.animation = 'none';
                        balloon.offsetHeight; // 触发重绘
                        balloon.style.animation = `showBalloon 1s ease-out ${currentIndex + 5}s forwards`;
                    }, 100);

                    currentIndex++;
                    // 继续下一个
                    setTimeout(showNextImage, 1000);
                }
            }, 3000);
        }

        // 等待初始动画完成后开始
        setTimeout(showNextImage, 8000);
    }

    // 开始自动播放
    startAutoPlay();
});

// 添加视图切换功能
const switchButton = document.querySelector('.switch-button');
const view2Button = document.querySelector('.view2-button');
const backButton = document.querySelector('.back-button');
const calligraphyPage = document.querySelector('.calligraphy-page');
const secondView = document.querySelector('.second-view');
const thirdView = document.querySelector('.third-view');
const fourthView = document.querySelector('.fourth-view');
const fifthView = document.querySelector('.fifth-view');
const drawerHandle = document.getElementById('drawerHandle');
const galleryBack = document.querySelector('.gallery-back');
const memoryBack = document.querySelector('.memory-back');
const planeButton = document.querySelector('.plane-button');
const letterModal = document.querySelector('.letter-modal');
const galleryPlane = document.querySelector('.gallery-plane');
const galleryLetterModal = document.querySelector('.gallery-letter-modal');

// 绑定所有事件监听器
function bindEventListeners() {
    // 切换视图1按钮
    if (switchButton) {
        switchButton.addEventListener('click', () => {
            calligraphyPage.classList.add('hide');
            setTimeout(() => {
                calligraphyPage.style.display = 'none';
                secondView.classList.add('show');
            }, 500);
        });
    }

    // 切换视图2按钮
    if (view2Button) {
        view2Button.addEventListener('click', () => {
            secondView.classList.remove('show');
            setTimeout(() => {
                secondView.style.display = 'none';
                thirdView.classList.add('show');
            }, 500);
        });
    }

    // 返回按钮
    if (backButton) {
        backButton.addEventListener('click', () => {
            thirdView.classList.remove('show');
            setTimeout(() => {
                thirdView.style.display = 'none';
                secondView.style.display = 'flex';
                secondView.classList.add('show');
            }, 500);
        });
    }

    // 抽屉把手
    if (drawerHandle) {
        drawerHandle.addEventListener('click', () => {
            thirdView.classList.remove('show');
            setTimeout(() => {
                thirdView.style.display = 'none';
                fourthView.style.display = 'flex';
                fourthView.classList.add('show');
            }, 500);
        });
    }

    // 第四视图返回按钮
    if (galleryBack) {
        galleryBack.addEventListener('click', () => {
            fourthView.classList.remove('show');
            setTimeout(() => {
                fourthView.style.display = 'none';
                thirdView.style.display = 'flex';
                thirdView.classList.add('show');
            }, 500);
        });
    }

    // 第五视图返回按钮
    if (memoryBack) {
        memoryBack.addEventListener('click', () => {
            fifthView.classList.remove('show');
            setTimeout(() => {
                fifthView.style.display = 'none';
                fourthView.style.display = 'flex';
                fourthView.classList.add('show');
            }, 500);
        });
    }

    // 小飞机按钮（第二视图）
    const planeButton = document.querySelector('.plane-button');
    const letterModal = document.querySelector('.letter-modal');
    
    if (planeButton && letterModal) {
        planeButton.addEventListener('click', () => {
            letterModal.classList.add('show');
        });

        // 点击模态框外部关闭
        letterModal.addEventListener('click', (e) => {
            if (e.target === letterModal) {
                letterModal.classList.remove('show');
            }
        });
    }

    // 小飞机按钮（第四视图）
    if (galleryPlane) {
        galleryPlane.addEventListener('click', () => {
            galleryLetterModal.classList.add('show');
        });
    }

    // 高铁按钮（第四视图）
    const galleryTrain = document.querySelector('.gallery-train');
    if (galleryTrain) {
        galleryTrain.addEventListener('click', () => {
            letterModal.classList.add('show');
        });
    }

    // 第四视图信件模态框关闭
    if (galleryLetterModal) {
        galleryLetterModal.addEventListener('click', (e) => {
            if (e.target === galleryLetterModal) {
                galleryLetterModal.classList.remove('show');
            }
        });
    }

    // 为记忆图片添加点击事件
    document.querySelectorAll('.memory-content img').forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.className = 'modal-image loading';
            modalImg.alt = this.alt;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-modal';
            closeBtn.innerHTML = '&times;';
            
            modalContent.appendChild(modalImg);
            modalContent.appendChild(closeBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // 添加加载动画
            modalImg.onload = function() {
                modalImg.classList.remove('loading');
                modalImg.classList.add('loaded');
            };
            
            // 显示模态框
            setTimeout(() => {
                modal.classList.add('show');
                modalImg.classList.add('show');
            }, 10);
            
            // 关闭模态框
            const closeModal = () => {
                modal.classList.remove('show');
                modalImg.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // ESC键关闭
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
}

// 页面加载时绑定事件
document.addEventListener('DOMContentLoaded', () => {
    bindEventListeners();
    
    // 为切换视图1中的图片添加点击事件
    document.querySelectorAll('.calligraphy-image-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            const img = this.querySelector('img');
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.className = 'modal-image loading';
            modalImg.alt = img.alt;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-modal';
            closeBtn.innerHTML = '&times;';
            
            modalContent.appendChild(modalImg);
            modalContent.appendChild(closeBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // 添加加载动画
            modalImg.onload = function() {
                modalImg.classList.remove('loading');
                modalImg.classList.add('loaded');
            };
            
            // 显示模态框
            setTimeout(() => {
                modal.classList.add('show');
                modalImg.classList.add('show');
            }, 10);
            
            // 关闭模态框
            const closeModal = () => {
                modal.classList.remove('show');
                modalImg.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // ESC键关闭
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
});

// 在视图切换后重新绑定事件
function rebindEvents() {
    bindEventListeners();
}

// 在视图切换后调用重新绑定
switchButton.addEventListener('click', rebindEvents);
view2Button.addEventListener('click', rebindEvents);
backButton.addEventListener('click', rebindEvents);
drawerHandle.addEventListener('click', rebindEvents);
galleryBack.addEventListener('click', rebindEvents);
memoryBack.addEventListener('click', rebindEvents);

// 为边框图片添加点击事件
document.querySelectorAll('.border-image img').forEach(img => {
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.className = 'modal-image loading';
        modalImg.alt = this.alt;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;';
        
        modalContent.appendChild(modalImg);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 添加加载动画
        modalImg.onload = function() {
            modalImg.classList.remove('loading');
            modalImg.classList.add('loaded');
        };
        
        // 显示模态框
        setTimeout(() => {
            modal.classList.add('show');
            modalImg.classList.add('show');
        }, 10);
        
        // 关闭模态框
        const closeModal = () => {
            modal.classList.remove('show');
            modalImg.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// 为第四视图的图片添加点击事件
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.className = 'modal-image loading';
        modalImg.alt = this.alt;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;';
        
        modalContent.appendChild(modalImg);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 添加加载动画
        modalImg.onload = function() {
            modalImg.classList.remove('loading');
            modalImg.classList.add('loaded');
        };
        
        // 显示模态框
        setTimeout(() => {
            modal.classList.add('show');
            modalImg.classList.add('show');
        }, 10);
        
        // 关闭模态框
        const closeModal = () => {
            modal.classList.remove('show');
            modalImg.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// 拍立得视图相关元素
const polaroidView = document.querySelector('.polaroid-view');
const polaroidBack = document.querySelector('.polaroid-back');
const galleryBridge = document.querySelector('.gallery-bridge');
const polaroidItems = document.querySelectorAll('.polaroid-item');

// 显示拍立得视图
galleryBridge.addEventListener('click', () => {
    polaroidView.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// 隐藏拍立得视图
polaroidBack.addEventListener('click', () => {
    polaroidView.classList.remove('show');
    document.body.style.overflow = '';
});

// 点击拍立得照片查看大图
polaroidItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img class="modal-image" src="${img.src}" alt="${img.alt}">
            </div>
        `;
        document.body.appendChild(modal);
        
        // 显示模态框
        setTimeout(() => {
            modal.classList.add('show');
            modal.querySelector('.modal-image').classList.add('show');
        }, 10);

        // 关闭模态框
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };

        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
}); 