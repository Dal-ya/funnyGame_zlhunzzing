let game = (function () {
  let instance
  let init = function(name) {
    let user = {
      name: name,
      level: 1,
      maxHp: 100,
      hp: 100,
      power: 5,
      exp: 0
    }
    let enemes = [
      {
        name: '쥐',
        level: 1,
        hp: 15,
        power: 1,
        exp: 1
      },
      {
        name: '좀비',
        level: 3,
        hp: 50,
        power: 2,
        exp: 3
      },
      {
        name: '[Boss]늑대인간',
        level: 10,
        hp: 150,
        power: 7,
        exp: 10
      }
    ]
    let eneme = null
    let turn = true

    return {
      showStat: function() {
        document.querySelector('.userName').innerHTML = user.name
        document.querySelector('.userLevel').innerHTML = '레 벨 : ' + user.level
        document.querySelector('.userHp').innerHTML = '체 력 : ' + user.hp + '/' + user.maxHp
        document.querySelector('.userPower').innerHTML = '공격력 : ' + user.power
        document.querySelector('.userExp').innerHTML = '경험치 : ' + user.exp + '/' + user.level * 3
        if(user.hp <= 0) {
          this.gameOver()
        }
        return this
      },
      showExp: function() {
        if(user.exp >= user.level * 3) {
          user.exp -= 3 * user.level
          user.level++
          user.maxHp += 5
          user.hp = user.maxHp
          user.power += 1
          this.showLog('레벨업!')

          // effcet
          let levelUp = document.createElement('div')
          levelUp.className = 'fadeInUp viewPoint'
          let effect = document.createElement('img')
          effect.src = 'https://user-images.githubusercontent.com/55573219/69803995-ee085b80-1220-11ea-8414-af46f1e8a844.png'
          levelUp.appendChild(effect)
          viewUser.prepend(levelUp)
          window.setTimeout(function () {
            viewUser.childNodes[0].remove()
          }, 1000)
          this.soundControl().levelUp()

          this.showStat()
          let now = this
          if(user.exp >= user.level * 3) {
            now.showExp()
          }
        }
        return this.showStat()
      },
      showLog: function(msg) {
        let newLog = document.createElement('div')
        newLog.innerHTML = msg
        log.prepend(newLog)

        //effect
        newLog.className = 'fadeIn'

        window.setTimeout(function () {
          newLog.className = 'fadeOut'

          window.setTimeout(function () {
            log.childNodes[log.childNodes.length-1].remove()
          }, 2000)
        }, 10000)

        if(log.childNodes.length > 10) {
          log.childNodes[10] = 'fadeOut'
          log.childNodes[10].style.display = 'none';
        }
        return this
      },
      showUser: function() {
        if(eneme) { // battle
          let userShow = document.createElement('div')
          userShow.id = 'showUser'

          let userImg = document.createElement('img')
          userImg.src = 'https://user-images.githubusercontent.com/55573219/69720180-6275c880-1155-11ea-80aa-8e4a0e9a88b8.gif'

          userShow.appendChild(userImg)

          viewUser.appendChild(userShow)
        } else {
          let userShow = document.createElement('div')
          userShow.id = 'showUser'

          let userFaceImg = document.createElement('img')
          userFaceImg.src = 'https://user-images.githubusercontent.com/55573219/69720188-64d82280-1155-11ea-893b-36a85ba0625f.png'
          userFace.appendChild(userFaceImg)
          let userImg = document.createElement('img')
          userImg.src = 'https://user-images.githubusercontent.com/55573219/69720180-6275c880-1155-11ea-80aa-8e4a0e9a88b8.gif'

          userShow.appendChild(userImg)

          viewUser.appendChild(userShow)
        }
      },
      toggleMenu: function() {
        document.querySelector('.startScreen').style.display = 'none'
        document.querySelector('#gameScreen').style.display = 'block'
        if(eneme) { //battle
          if(document.querySelector('.battleBar').style.display === 'block') {
            document.querySelector('.battleBar').style.display = 'none'
            document.querySelector('.nextTurnBar').style.display = 'block'
          } else if(document.querySelector('.battleBar').style.display === 'none') {
            document.querySelector('.battleBar').style.display = 'block'
            document.querySelector('.nextTurnBar').style.display = 'none'
          }
        }
        else
        if(document.querySelector('.menuBar').style.display === 'block') {
          document.querySelector('.menuBar').style.display = 'none'
          document.querySelector('.battleBar').style.display = 'block'
        } else {
          document.querySelector('.menuBar').style.display = 'block'
          document.querySelector('.battleBar').style.display = 'none'
        }
        return this
      },
      generateEneme: function() {
        eneme = JSON.parse(JSON.stringify(enemes[Math.floor(Math.random() * enemes.length)]))
        let enemeStat = document.createElement('div')
        enemeStat.id = 'enemeStatus'
        enemeInfo.appendChild(enemeStat)
        enemeStatus.className = 'fadeIn'

        let enemeName = document.createElement('span')
        enemeName.className = 'enemeName'
        enemeName.innerHTML = '* 몬스터 : ' + eneme.name
        enemeStatus.appendChild(enemeName)
        let enemeHp = document.createElement('span')
        enemeHp.className = 'enemeHp'
        enemeHp.innerHTML = ' / 체력 : ' + eneme.hp
        enemeStatus.appendChild(enemeHp)
        let enemePower = document.createElement('span')
        enemePower.className = 'enemePower'
        enemePower.innerHTML = ' / 공격력 : ' + eneme.power
        enemeStatus.appendChild(enemePower)
     
        this.showEneme().showLog(eneme.name + ' 이(가) 위협해왔다.')
        return this
      },
      showEneme: function() {
        let enemeShow = document.createElement('div')
        enemeShow.id = 'showEneme'

        let enemeImg = document.createElement('img')
        if(eneme.name === '쥐') {
          enemeImg.src = 'https://user-images.githubusercontent.com/55573219/69724376-2b0c1980-115f-11ea-8fdb-5c314ccef8c6.gif'
        }
        if(eneme.name === '좀비') {
          enemeImg.src = 'https://user-images.githubusercontent.com/55573219/69724449-46772480-115f-11ea-8c87-548fa7a1d6e9.gif'
        }
        if(eneme.name === '[Boss]늑대인간') {
          enemeImg.src = 'https://user-images.githubusercontent.com/55573219/69724479-55f66d80-115f-11ea-8dd6-a11ce22fa55f.gif'
        }
        enemeShow.appendChild(enemeImg)

        viewEneme.appendChild(enemeShow)
        return this
      },
      attackEneme: function() {
        eneme.hp -= user.power
        if(eneme.hp < 0) {
          eneme.hp = 0
        }

        this.hitEffect()

        document.querySelector('.enemeHp').innerHTML = ' / 체력 : ' + eneme.hp
        if(eneme.hp > 0) {
          this.nextTurn().showLog(user.power + '의 데미지를 입혔다.')
        } else {
          this.showLog(user.power + '의 데미지를 입혔다.').toggleMenu()

          let now = this
          window.setTimeout(function () {
            now.win()
          }, 500)
        }
      },
      hitEffect: function() {
        showUser.childNodes[0].remove()
        let userAttack = document.createElement('img')
        userAttack.src = 'https://user-images.githubusercontent.com/55573219/69721453-36a81200-1158-11ea-95af-4fae9c773833.gif'
        showUser.appendChild(userAttack)
        let now = this
        window.setTimeout(function () {
          showUser.childNodes[0].remove()
          let userImg = document.createElement('img')
          userImg.src = 'https://user-images.githubusercontent.com/55573219/69720180-6275c880-1155-11ea-80aa-8e4a0e9a88b8.gif'
          showUser.appendChild(userImg)
        }, 500)

        showEneme.className = 'blinking'

        window.setTimeout(function () {
          showUser.remove()          
          now.showUser()          
        }, 500)

        this.soundControl().punch()

        this.damageEffect(user)
      },
      damageEffect: function(cause) {
        let damageBar = document.createElement('div')
        damageBar.className = 'fadeInUp viewPoint'

        let minus = document.createElement('img')
        minus.src = 'https://user-images.githubusercontent.com/55573219/69775993-f25f5500-11dd-11ea-879e-274fc44a8888.png'
        damageBar.appendChild(minus)

        let damage = cause.power
        for(let i=0; i<String(damage).length; i++) {
          let point = document.createElement('img')
          if(String(damage)[i] === '0') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69775996-f4291880-11dd-11ea-8ebb-bad471bc0b5f.png'
          }
          if(String(damage)[i] === '1') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69775999-f55a4580-11dd-11ea-869a-4aa03df08473.png'
          }
          if(String(damage)[i] === '2') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69776003-f7bc9f80-11dd-11ea-8446-da6148eb029d.png'
          }
          if(String(damage)[i] === '3') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69776006-fb502680-11dd-11ea-96f7-668e942e9593.png'
          }
          if(String(damage)[i] === '4') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69776012-fee3ad80-11dd-11ea-9ab2-a72a8f16f8d4.png'
          }
          if(String(damage)[i] === '5') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69776014-00ad7100-11de-11ea-81e4-e289f06fc6ac.png'
          }
          if(String(damage)[i] === '6') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69776024-05722500-11de-11ea-8e2f-78bc4a0764de.png'
          }
          if(String(damage)[i] === '7') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69776025-06a35200-11de-11ea-9064-2989306bfb23.png'
          }
          if(String(damage)[i] === '8') {
            point.src = '(https://user-images.githubusercontent.com/55573219/69776030-07d47f00-11de-11ea-95e2-0fe9342a266f.png'
          }
          if(String(damage)[i] === '9') {
            point.src = 'https://user-images.githubusercontent.com/55573219/69776034-0905ac00-11de-11ea-9ea1-91c28d3ea729.png'
          }
          damageBar.appendChild(point)
        }
        let now = this
        if(cause === user) {
          viewEneme.prepend(damageBar)
          window.setTimeout(function () {
            viewEneme.childNodes[0].remove()
          }, 1000)
        } else {
          viewUser.prepend(damageBar)
          window.setTimeout(function () {
            viewUser.childNodes[0].remove()
          }, 1000)
        }
      },
      nextTurn: function() {
        let now = this
        turn = !turn
        if(!turn) {
          this.toggleMenu()
      
          window.setTimeout(function () {
            now.showLog(eneme.name + '의 턴입니다.')
              
            window.setTimeout(function () {
              now.attackUser()
      
              if(user.hp > 0) {
                window.setTimeout(function () {
                  now.toggleMenu().showLog('나의 턴!')
                },1000)
              }
      
            },1000)
      
          },1000)
          turn = !turn
        }
        return this
      },
      attackUser: function() {
        user.hp -= eneme.power

        this.showStat().showLog(eneme.power + '의 데미지를 입었다.').getHitEfeect()
      },
      getHitEfeect: function() {
        showEneme.remove()
        let enemeShow = document.createElement('div')
        enemeShow.id = 'showEneme'
        viewEneme.appendChild(enemeShow)
        let enemeAttack = document.createElement('img')
        if(eneme.name === '쥐') {
          enemeAttack.src = 'https://user-images.githubusercontent.com/55573219/69724384-2d6e7380-115f-11ea-823c-b13881258722.png'
        }
        if(eneme.name === '좀비') {
          enemeAttack.src = 'https://user-images.githubusercontent.com/55573219/69724456-49721500-115f-11ea-9351-c9373919bbfc.png'
        }
        if(eneme.name === '[Boss]늑대인간') {
          enemeAttack.src = 'https://user-images.githubusercontent.com/55573219/69724493-5d1d7b80-115f-11ea-840c-676dc19499eb.png'
        }
        showEneme.appendChild(enemeAttack)

        showUser.className = 'blinking'

        let now = this
        window.setTimeout(function () {
          showEneme.remove()
          now.showEneme()
        }, 500)

        this.soundControl().punch()

        this.damageEffect(eneme)
      },
      win: function() {
        user.exp += eneme.exp
        this.showMessage('전투에서 승리했다!').showLog(eneme.name + '를 사냥해서 경험치' + eneme.exp + ' 을(를) 얻었다.').showExp().clearEneme()
      },
      showMessage: function (msg) {
        message.innerHTML = msg
        viewMessage.style.display = 'block'
        return this
      },
      clearEneme: function () {
        eneme = null;
        enemeStatus.remove()
        showEneme.className = 'fadeOut'
        document.querySelector('.battleBar').style.display = 'none'
        document.querySelector('.nextTurnBar').style.display = 'block'
        let now = this
        window.setTimeout(function () {
          showEneme.remove()
          document.querySelector('.nextTurnBar').style.display = 'none'
          document.querySelector('.menuBar').style.display = 'block'
        }, 2000)
        return this
      },
      gameOver: function() {
        document.querySelector('#gameScreen').innerHTML = user.name + '은(는) 레벨' + user.level + '에서 죽었습니다. 새로 시작하려면 새로고침하세요'
      },
      rest: function() {
        if(eneme) {
          user.hp += user.maxHp/5
          if(user.hp > user.maxHp) {
            user.hp = user.maxHp
          }
          this.showExp().showLog('체력을 회복했다.')
        } else {
          user.hp = user.maxHp;
          this.showExp().showLog('체력을 회복했다.')
        }
        return this
      },
      exit: function() {
        document.querySelector('#gameScreen').innerHTML = '게임을 종료했습니다. 새로 시작하려면 새로고침하세요.'
      },
      soundControl: function() {
        return {
          punch: function() {
            if(punchSound.paused) {
              punchSound.play()
            } else {
              punchSound.pause()
              punchSound.currentTime = 0
            }
          },
          levelUp: function() {
            if(levelUpSound.paused) {
              levelUpSound.play()
            } else {
              levelUpSound.pause()
              levelUpSound.currentTime = 0
            }
          },

        }

      },
    }
  }
  return {
      getInstance: function (name) {
        if (!instance) {
          instance = init(name);
        }
        return instance;
      }
    }
})()

nameForm.onsubmit = function (e) {
  e.preventDefault()

  bgm()

  let name = document.querySelector('.nameBox').value
  if (name.trim() && confirm(name.trim() + '(으)로 하겠습니까?')) {
    game.getInstance(name).showExp().toggleMenu().showUser()
  } else {
    alert('캐릭터의 이름을 입력해주세요.')
  }
}

document.querySelectorAll('.menu').forEach(element => {
  element.onclick = function() {
    if(element.innerHTML === '모험한다') {
      game.getInstance().toggleMenu().generateEneme()
    }
    if(element.innerHTML === '휴식한다') {
      game.getInstance().rest()
    }
    if(element.innerHTML === '그만한다') {
      game.getInstance().exit()
    }
  }
})

document.querySelectorAll('.battleMenu').forEach(element => {
  element.onclick = function() {
    if(element.innerHTML === '공격한다') {
      game.getInstance().attackEneme()
    }
    if(element.innerHTML === '회복한다') {
      game.getInstance().rest().showExp().nextTurn()
    }
    if(element.innerHTML === '도망친다') {
      showEneme.className = 'fadeOut'
      game.getInstance().clearEneme().showMessage('도망쳤다')
    }
  }
})

messageButton.onclick = function() {
  viewMessage.style.display = 'none'
}

bgm = function() {
    bgmSound.play()
}