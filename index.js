const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver
const settings = require('./config.json')

/*
      <
      
      > !!! DO NOT REMOVE !!!

      > © Developed by Lil Panda
      
      > Need support? Contact me @Lil Panda#0602 on discord.
      > Portfolio: https://ajayrao.me
      > Support Server: https://discord.gg/ydfGvC3Z45

      > Previous work [
          Head Management & Developer @ CentroNodes.com,
          CEO & Founder @ RebelNodes.com,
          Support Leader @ RocketNodes.gq
      ]

      > Known Languages [
          PHP,
          NodeJS,
          Javascript
      ]
     
      > !!! DO NOT REMOVE !!!

      < 
*/



const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const client = new Client({
  intents: 131071
});


// Change this to what you want :)
const prefix = "!"
// ends here



client.on('ready', () => {


  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Logged in as ${client.user.id}!`);
  client.user.setActivity("Madfut Vibes", {
    type: "Streaming"
  });


});

client.on('messageCreate', async (message) => {



  const Throw = message.reply
  let channelID = "990759691745386576"
  console.log(message.channel.id)


  let userInventory = "";


  if (!message.content.toLowerCase().startsWith(prefix)) {
    return;

  } else {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();



    if (command === 'inventory') {

      try {

        // if (message.channel.id != settings.walletChannel) {
        //     return message.reply(`Error: Command cannot be ran in this channel. Use <#${settings.walletChannel}`)
        // }


        if (message.mentions.users.first() != undefined) {

          user_id = message.mentions.users.first().id
          if (!await db.get(`${user_id}.inventory`)) {
            userInventory = "Your inventory is empty."
          } else {
            userInventory = db.get(`${user_id}.inventory`)
            console.log(userInventory)
          }
          console.log(userInventory)
          let MentionInventory = new MessageEmbed()
            .setColor('#FF2455')
            .setTitle(`Please wait...`)

          let SecondMsg = new MessageEmbed()
            .setColor('#FF2455')
            .setTitle(`${message.mentions.users.first().username}'s inventory`)
            .setDescription(`${userInventory}`)

          message.reply({ embeds: [MentionInventory] }).then(msg => setTimeout(() => msg.delete(), 5000));

          setTimeout(() => {
            message.channel.send(`||${message.mentions.users.first()}||`).then(msg => setTimeout(() => msg.delete(), 500));
            message.reply({ embeds: [SecondMsg] });
          }, 5000);

        }
        else {
          if (!db.get(`${message.author.id}.inventory`)) {
            userInventory = "Inventory is empty."
          } else {
            userInventory = db.get(`${message.author.id}.inventory`);
          }
          let MentionInventory = new MessageEmbed()
            .setColor('#FF2455')
            .setTitle(`Please wait...`)



          let SecondMsg = new MessageEmbed()
            .setColor('#FF2455')
            .setTitle(`Your Inventory`)
            .setDescription(`${userInventory}`)

          message.reply({ embeds: [MentionInventory] }).then(msg => setTimeout(() => msg.delete(), 2000));

          setTimeout(() => {
            message.reply({ embeds: [SecondMsg] });
          }, 2000);
        }

      } catch (err) {
        client.channels.cache.get(settings.ErrorChannel).send(`\`\`\`\n${err}\n\`\`\``)
      }
    }


    if (command === 'claimdaily') {

      try {

        if (message.channel.id != settings.DailySpin) {
          return message.reply(`Error: Command cannot be ran in this channel. Use <#${settings.DailySpin}>`)
        }

        let itemsArray = []

        let db = require('quick.db')

        if (db.get(`${message.author.id}.inventory`) === null) {
          console.log('1')
          itemsArray = []

        } else if (db.get(`${message.author.id}`) === []) {

          db.delete(`${message.author.id}`)
          console.log('2')
          itemsArray = []

        } else if (db.get(`${message.author.id}`) === undefined) {

          console.log('3')
          itemsArray = []

        } else {

          if (db.get(`${message.author.id}.inventory`)) {
            itemsArray = db.get(`${message.author.id}.inventory`)
          } else {
            db.delete(`${message.author.id}`)
          }
          console.log('4')
          console.log(itemsArray)

        }

        var itemslist = ['Benzema', '', 'Son', 'Hakimi', 'Mohamed_Salah', 'Maradona', 'Zidane', 'Kimmich', '95+_pack', '94+_pack', '93+_pack', '92+_pack', 'Modric', 'Messi', 'Ronaldo'];
        var randomized_card = itemslist[(Math.random() * itemslist.length) | 0]





        const dailyClaimEmbed1 = new MessageEmbed()
          .setTitle('💎 Daily Claim')
          .setColor('#a949e1')
          .setDescription('Randomizing a card for your collection...')

        const dailyClaimEmbed2 = new MessageEmbed()
          .setTitle('💎 Daily Claim | ✅')
          .setColor('#a949e1')
          .setDescription(`\`${randomized_card}\` was found! It has been added to your inventory.`)
        const ms = require('pretty-ms');


        //check if there is cooldown
        const timeout = 86400000; // 1 day in milliseconds
        const cooldown = await db.fetch(`dailyclaim-${message.author.id}`);

        if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
          let time = ms(timeout - (Date.now() - cooldown), { verbose: true });
          time = time.split(' ', 4).join(' ')

          const LessThan1Day = new MessageEmbed()
            .setTitle('💎 Daily Claim | ⌛')
            .setColor('#a949e1')
            .setDescription(`You've already claimed your daily claim...\n\nYou still have to wait \`${time}\` before you can use it again...`)

          message.reply({ embeds: [LessThan1Day] });


        } else {


          // Send embed telling user what they won.
          message.reply({ embeds: [dailyClaimEmbed2] });

          if (itemsArray) {
            if (itemsArray.indexOf(randomized_card) != undefined) {
              itemsArray.push(randomized_card);
              console.log(`randomized_card defined`)
            }
          }


          db.set(`${message.author.id}.inventory`, itemsArray)

          db.set(`dailyclaim-${message.author.id}`, Date.now());
        }
      } catch (err) {
        client.channels.cache.get(settings.ErrorChannel).send(`\`\`\`\n${err}\n\`\`\``)
      }
    }






    if (command === 'premiumspin') {

      try {

        if (message.channel.id != settings.PremiumSpin) {
          return message.reply(`Error: Command cannot be ran in this channel. Use <#${settings.PremiumSpin}>`)
        }

        let itemsArrayPrem = []

        let db = require('quick.db')

        if (db.get(`${message.author.id}.wallet`) === null) {
          console.log('1')
          itemsArrayPrem = []

        } else if (db.get(`${message.author.id}`) === []) {

          db.delete(`${message.author.id}`)
          console.log('2')
          itemsArrayPrem = []

        } else if (db.get(`${message.author.id}`) === undefined) {

          console.log('3')
          itemsArrayPrem = []

        } else {

          if (db.get(`${message.author.id}.wallet`)) {
            itemsArrayPrem = db.get(`${message.author.id}.wallet`)
          } else {
            db.delete(`${message.author.id}`)
          }
          console.log('4')
          console.log(itemsArrayPrem)

        }

        var itemslist = ['1_bot trade', '2_bot_trade', '10_bot_trade', '6_bot_trade', '1_bot_trade', '1_bot_trade', '1_bot_trade', '1_bot_trade', '8_bot_trade', '1_bot_trade', '1_bot_trade', '1_bot_trade', '1_bot_trade', '1_bot_trade', '1_bot_trade'];
        var randomized_card = itemslist[(Math.random() * itemslist.length) | 0]





        const dailySpinEmbed1 = new MessageEmbed()
          .setTitle('💎 Premium Spin')
          .setColor('#a949e1')
          .setDescription('Randomizing a card for your collection...')

        const dailySpinEmbed2 = new MessageEmbed()
          .setTitle('💎 Premium Spin | ✅')
          .setColor('#a949e1')
          .setDescription(`\`${randomized_card}\` was found! It has been added to your wallet.`)
        const ms = require('pretty-ms');


        //check if there is cooldown
        const timeout = 86400000; // 1 day in milliseconds
        const cooldown = await db.fetch(`premiumspin-${message.author.id}`);

        if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
          let time = ms(timeout - (Date.now() - cooldown), { verbose: true });
          time = time.split(' ', 4).join(' ')

          const LessThan1Day = new MessageEmbed()
            .setTitle('💎 Premium Spin | ⌛')
            .setColor('#a949e1')
            .setDescription(`You've already claimed your premium spin for today...\n\nYou still have to wait \`${time}\` before you can use it again...`)

          message.reply({ embeds: [LessThan1Day] });


        } else {


          // Send embed telling user what they won.
          message.reply({ embeds: [dailySpinEmbed2] });

          if (randomized_card) {
            if (itemsArrayPrem.indexOf(randomized_card) != undefined) {
              itemsArrayPrem.push(randomized_card);
            }
          }




          db.set(`${message.author.id}.wallet`, itemsArrayPrem)

          db.set(`premiumspin-${message.author.id}`, Date.now());
        }
      } catch (err) {
        client.channels.cache.get(settings.ErrorChannel).send(`\`\`\`\n${err}\n\`\`\``)
      }
    }

















    if (command === 'removeitem') {


      try {


        // if (message.channel.id != settings.RemoveItem) {
        //     return message.reply("Error: Commands cannot be ran in this channel.")
        // }

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
          message.delete()
          console.log(`${message.author.tag} attempted to use the removeitem command!`)

          if (message.author.createDM) {
            return message.author.send("You do not have the appropriate permissions to use the `removeitem` command.")
          } else {
            return message.channel.send(`${message.author}, You do not have the appropriate permissions to use the \`removeitem\` command.`)
          }
        }


        let msgArray = message.content.split(" ");
        let args = msgArray.slice(1);

        if (message.mentions.users.first() === undefined) {
          return message.reply("You have not provided a user to remove a item from!")
        }

        let ItemOwner = message.mentions.users.first().id


        if (!args[1]) {
          return message.reply("Please specify a item to be removed from this user.\n\n**Format for this command:** `.removeitem <@user> <item>`")
        } else {


          let item = args[1]
          itemUppercase = item
          item = item.toLowerCase()


          if (item == "ronaldo" || item == "messi" || item == "8_bot_trade" || item == "8_bot_trade" || item == "95+_pack" || item == "94+_pack" || item == "93+_pack" || item == "92+_pack" || item == '1_bot_trade' || item == '2_bot_trade' || item == '10_bot_trade' || item == '6_bot_trade') {

          } else {
            return message.reply("This is an invalid item. It does not exist and cannot be removed!")
          }

          const NoItemsEmbed = new MessageEmbed()
            .setTitle('Invalid Request')
            .setDescription('This user does not own the item you are trying to remove.')
            .setTimestamp()
            .setColor('WHITE')

          const SuccessfulRequest = new MessageEmbed()
            .setTitle('Successful Request')
            .setDescription(`Removed ${item}`)
            .setTimestamp()
            .setColor('WHITE')


          let userItems = db.get(`${message.mentions.users.first().id}.wallet`)

          if (userItems === undefined) return message.reply({ embeds: [NoItemsEmbed] })
          if (userItems.indexOf(item) <= -1) {
            return message.reply({ embeds: [NoItemsEmbed] })
          } else {
            index = userItems.indexOf(item)
            userItems.splice(index, 1);
            db.set(`${ItemOwner}.wallet`, userItems)
            return message.reply({ embeds: [SuccessfulRequest] })
          }




        }


      } catch (err) {
        client.channels.cache.get(settings.ErrorChannel).send(`\`\`\`\n${err}\n\`\`\``)
      }

    }







  }

});
client.login(process.env.DISCORD_BOT_SECRET);