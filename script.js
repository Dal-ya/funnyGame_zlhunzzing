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
        if(user.hp <= 0) {
          gameOver()
        }
        return this
      },
      showExp: function() {
        let now = this

        if(user.exp >= user.level * 3) {
          user.exp -= 3 * user.level
          user.level++
          user.maxHp += 5
          user.hp = user.maxHp
          user.power += 1
          window.setTimeout(function() {
            now.showMessage('레벨업!');
          }, 1000);
        }
        document.querySelector('.userExp').innerHTML = '경험치 : ' + user.exp + '/' + user.level * 3
        return this.showStat()
      },
      showMessage: function(msg) {
        let newMessage = document.createElement('div')
        newMessage.innerHTML = msg
        message.prepend(newMessage)

        newMessage.className = 'fadeIn'

        window.setTimeout(function () {
          newMessage.className = 'fadeOut'

          window.setTimeout(function () {
            message.childNodes[message.childNodes.length-1].remove()
          }, 2500)
        }, 10000)


        if(message.childNodes.length > 10) {
          message.childNodes[10] = 'fadeOut'
          message.childNodes[10].style.display = 'none';
        }
        return this
      },
      showUser: function() {
        let userFaceImg = document.createElement('img')
        userFaceImg.src = 'https://user-images.githubusercontent.com/55573219/69720188-64d82280-1155-11ea-893b-36a85ba0625f.png'
        userFace.appendChild(userFaceImg)
        let userImg = document.createElement('img')
        userImg.src = 'https://user-images.githubusercontent.com/55573219/69720180-6275c880-1155-11ea-80aa-8e4a0e9a88b8.gif'
        showUser.appendChild(userImg)
      },
      toggleMenu: function() {
        document.querySelector('.startScreen').style.display = 'none'
        document.querySelector('#gameScreen').style.display = 'block'
        if(eneme) {
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
     
        this.showEneme().showMessage(eneme.name + ' 이(가) 위협해왔다.')
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
        gameScreen.appendChild(enemeShow)
        showEneme.appendChild(enemeImg)
        return this
      },
      attackEneme: function() {
        eneme.hp -= user.power
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

        document.querySelector('.enemeHp').innerHTML = ' / 체력 : ' + eneme.hp
        if(eneme.hp > 0) {
          this.nextTurn().showMessage(user.power + '의 데미지를 입혔다.')
        } else
        this.win()
      },
      nextTurn: function() {
        let now = this
        turn = !turn
        if(!turn) {
          this.toggleMenu()
      
          window.setTimeout(function () {
            now.showMessage(eneme.name + '의 턴입니다.')
              
            window.setTimeout(function () {
              now.attackUser()
      
              if(user.hp > 0) {
                window.setTimeout(function () {
                  now.toggleMenu().showMessage('당신의 턴입니다.')
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
        showEneme.childNodes[0].remove()
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
        let now = this
        window.setTimeout(function () {
          showEneme.remove()
          now.showEneme()
        }, 500)

        this.showStat().showMessage(eneme.power + '의 데미지를 입었다.')
      },
      win: function() {
        user.exp += eneme.exp
        this.showMessage(eneme.name + '를 사냥해서 경험치' + eneme.exp + ' 을(를) 얻었다.').clearEneme().showExp()
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
          this.showExp().showMessage('체력이 회복되었다')
        } else {
          user.hp = user.maxHp;
          this.showExp().showMessage('체력이 회복되었다')
        }
        return this
      },
      exit: function() {
        document.querySelector('#gameScreen').innerHTML = '게임이 종료되었습니다. 새로 시작하시려면 새로고침하세요.'
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

  let name = document.querySelector('.nameBox').value
  if (name.trim() && confirm(name.trim() + '(으)로 하시겠습니까?')) {
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
      game.getInstance().clearEneme().showMessage('도망쳤습니다.')
    }
  }
})