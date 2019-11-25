document.querySelector('.startBar').onsubmit = function (e) {
  e.preventDefault()

  let name = document.querySelector('.nameInput').value
  if (name.trim() && confirm(name.trim() + '(으)로 하시겠습니까?')) {
    document.querySelector('.startBar').style.display = 'none'
    user['name'] = name
    ShowStatus()
    document.querySelector('.menuBar').style.display = 'block'
  } else {
    alert('캐릭터의 이름을 입력해주세요.')
  }
}

ShowStatus = function() {
  showStat = function() {
    document.querySelector('.userName').innerHTML = '이름:' + user.name
    document.querySelector('.userLevel').innerHTML = 'Level:' + user.level
    document.querySelector('.userHp').innerHTML = 'HP:' + user.hp + '/' + user.maxHp
    document.querySelector('.userPower').innerHTML = 'Power:' + user.power
    if(user.hp <= 0) {
      gameOver()
    }
  }
  showStat()

  showExp = function() {
    if(user.exp >= user.level * 3) {
      user.exp -= 3 * user.level
      user.level++
      user.maxHp += 5
      user.hp = user.maxHp
      user.power += 1
      window.setTimeout(function() {
        showMessage('레벨업!');
      }, 1000);
    }
    document.querySelector('.userExp').innerHTML = 'EXP:' + user.exp + '/' + user.level * 3
    return showStat()
  }
  showExp()
}

document.querySelectorAll('.menu').forEach(element => {
  element.onclick = function() {
    if(element.innerHTML === '모험한다') {
      toggleMenu()
      generateMonster()
    }
    if(element.innerHTML === '휴식한다') {
      user.hp = user.maxHp;
      showStat()
      showMessage('체력이 회복되었다')
    }
    if(element.innerHTML === '그만한다') {
      exit()
    }
  }
})

let monster
generateMonster = function() {
  monster = JSON.parse(JSON.stringify(monsters[Math.floor(Math.random() * monsters.length)]))
  document.querySelector('.monsterName').innerHTML = '몬스터:' + monster.name
  document.querySelector('.monsterHp').innerHTML = 'HP:' + monster.hp
  document.querySelector('.monsterPower').innerHTML = 'Power:' + monster.power
  showMessage(monster.name + ' 이(가) 위협해왔다.')
}

showMessage = function(messege) {
  document.querySelector('.Messege').innerHTML = messege
}

toggleMenu = function() {
  if(monster) {
    if(document.querySelector('.battleBar').style.display === 'block') {
      document.querySelector('.battleBar').style.display = 'none'
      document.querySelector('.nextTurnBar').style.display = 'block'
    } else
    if(document.querySelector('.battleBar').style.display === 'none') {
      document.querySelector('.battleBar').style.display = 'block'
      document.querySelector('.nextTurnBar').style.display = 'none'
    }
  }
  else
  if(document.querySelector('.menuBar').style.display === 'block') {
    document.querySelector('.menuBar').style.display = 'none'
    document.querySelector('.battleBar').style.display = 'block'
  } else
  if(document.querySelector('.menuBar').style.display === 'none') {
    document.querySelector('.menuBar').style.display = 'block'
    document.querySelector('.battleBar').style.display = 'none'
  }
}

exit = function() {
  document.querySelector('.Screen').innerHTML = '게임이 종료되었습니다. 새로 시작하시려면 새로고침하세요.'
}

document.querySelectorAll('.battleMenu').forEach(element => {
  element.onclick = function() {
    if(element.innerHTML === '공격한다') {
      attackMonster()
    }
    if(element.innerHTML === '회복한다') {
      user.hp = user.maxHp;
      showStat()
      showMessage('체력이 회복되었다')
      nextTurn()
    }
    if(element.innerHTML === '도망친다') {
      clearMonster()
      showMessage('도망쳤습니다.')
    }
  }
})

attackMonster = function() {
  monster.hp -= user.power
  document.querySelector('.monsterHp').innerHTML = 'HP:' + monster.hp
  if(monster.hp > 0) {
    showMessage(user.power + '의 데미지를 입혔다.')
    nextTurn()
  } else
  win()
}

let turn = true
nextTurn = function() {

  turn = !turn
  if(!turn) {
    toggleMenu()

    window.setTimeout(function () {
      showMessage(monster.name + '의 턴입니다.')
        
      window.setTimeout(function () {
        attackUser()

        if(user.hp > 0) {
          window.setTimeout(function () {
            toggleMenu()
            showMessage('당신의 턴입니다.')
          },1000)
        }

      },1000)

    },1000)
    turn = !turn
  }
}

attackUser = function() {
  user.hp -= monster.power
  showMessage(monster.power + '의 데미지를 입었다.')
  showStat()
}

win = function() {
  user.exp += monster.exp
  showMessage(monster.name + '를 사냥해서 경험치' + monster.exp + ' 을(를) 얻었다.')
  clearMonster()
  showExp()
}

clearMonster = function () {
  monster = null;
  document.querySelector('.monsterName').innerHTML = ''
  document.querySelector('.monsterHp').innerHTML = ''
  document.querySelector('.monsterPower').innerHTML = ''
  toggleMenu()
}

gameOver = function() {
  document.querySelector('.Screen').innerHTML = user.name + '은(는) 레벨' + user.level + '에서 죽었습니다. 새로 시작하려면 새로고침하세요'
}