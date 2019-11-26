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
    let monsters = [
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
    let monster = null
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

        newMessage.className = 'showMessage'

        window.setTimeout(function () {
          newMessage.className = 'hideMessage'

          window.setTimeout(function () {
            message.childNodes[message.childNodes.length-1].remove()
          }, 2500)
        }, 10000)


        if(message.childNodes.length > 10) {
          message.childNodes[10] = 'hideMessage'
          message.childNodes[10].style.display = 'none';
        }

        return this
      },
      viewUser: function() {
        let userImg = document.createElement('img')
        userImg.src = 'https://user-images.githubusercontent.com/55573219/69599118-396b1000-104f-11ea-8757-1c5779b71c00.png'
        viewUser.appendChild(userImg)
      },
      toggleMenu: function() {
        document.querySelector('.startScreen').style.display = 'none'
        document.querySelector('.screen').style.display = 'block'
        if(monster) {
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
      generateMonster: function() {
        monster = JSON.parse(JSON.stringify(monsters[Math.floor(Math.random() * monsters.length)]))
        document.querySelector('.monsterName').innerHTML = '몬스터 : ' + monster.name
        document.querySelector('.monsterHp').innerHTML = '/ 체력 : ' + monster.hp
        document.querySelector('.monsterPower').innerHTML = '/ 공격력 : ' + monster.power
        this.showMessage(monster.name + ' 이(가) 위협해왔다.')
        return this
      },
      attackMonster: function() {
        monster.hp -= user.power
        document.querySelector('.monsterHp').innerHTML = 'HP:' + monster.hp
        if(monster.hp > 0) {
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
            now.showMessage(monster.name + '의 턴입니다.')
              
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
        user.hp -= monster.power
        this.showStat().showMessage(monster.power + '의 데미지를 입었다.')
      },
      win: function() {
        user.exp += monster.exp
        this.showMessage(monster.name + '를 사냥해서 경험치' + monster.exp + ' 을(를) 얻었다.').clearMonster().showExp()
      },
      clearMonster: function () {
        monster = null;
        document.querySelector('.monsterName').innerHTML = ''
        document.querySelector('.monsterHp').innerHTML = ''
        document.querySelector('.monsterPower').innerHTML = ''
        this.toggleMenu()
        return this
      },
      gameOver: function() {
        document.querySelector('.screen').innerHTML = user.name + '은(는) 레벨' + user.level + '에서 죽었습니다. 새로 시작하려면 새로고침하세요'
      },
      rest: function() {
        user.hp = user.maxHp;
        this.showExp().showMessage('체력이 회복되었다')
        return this
      },
      exit: function() {
        document.querySelector('.screen').innerHTML = '게임이 종료되었습니다. 새로 시작하시려면 새로고침하세요.'
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
    game.getInstance(name).showExp().toggleMenu().viewUser()
  } else {
    alert('캐릭터의 이름을 입력해주세요.')
  }
}

document.querySelectorAll('.menu').forEach(element => {
  element.onclick = function() {
    if(element.innerHTML === '모험한다') {
      game.getInstance().toggleMenu().generateMonster()
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
      game.getInstance().attackMonster()
    }
    if(element.innerHTML === '회복한다') {
      game.getInstance().rest().showExp().nextTurn()
    }
    if(element.innerHTML === '도망친다') {
      game.getInstance().clearMonster().showMessage('도망쳤습니다.')
    }
  }
})